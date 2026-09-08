/* Testes unitários
 Testes ponta a ponta (e2e)
 > AAA
 >  Configuração do test (Arrange)
 >  Algo que deseja fazer a ação (Act)
 >  Conferir se ação foi esperada (Assert) 
*/



import { HashingServiceProtocol } from "src/auth/hash/hashing.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismasService } from "src/prismas/prismas.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dtos/create.dto";

describe('UsersService', () => {
  let userService: UsersService;
  let prismaService: PrismasService;
  let hashingService: HashingServiceProtocol;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismasService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({
                id: 1,
                name: 'Matheus',
                email: 'matheus@teste.com'

              }),

              findFirst: jest.fn()
            }
          }
        },
        {
          provide: HashingServiceProtocol,
          useValue: {
            hash: jest.fn()
          }
        }
      ]
    }).compile()

    userService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismasService>(PrismasService);
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol)

  })

  it('should be define users service', () => {
    expect(userService).toBeDefined();
  })


  it('should create a new user', async () => {

    const createUserDto: CreateUserDto = {
      email: 'matheus@teste.com',
      name: 'Matheus',
      password: '123123'
    }

    jest.spyOn(hashingService, 'hash').mockResolvedValue("HASH_MOCK_EXEMPLO")

    const result = await userService.create(createUserDto)
    console.log(result)

    await userService.create(createUserDto)

    expect(hashingService.hash).toHaveBeenCalled()

    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: "HASH_MOCK_EXEMPLO"
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    expect(result).toEqual({
      id: 1,
      name: createUserDto.name,
      email: createUserDto.email
    })

  })

  it('shold return a user when found', async () => {
    const mokerUser = {
      id: 1,
      name: 'Matheus',
      email: 'matheus@teste.com',
      avatar: null,
      Task: [],
      passwordHash: 'hash_exemplo2',
      active: true,
      CreatedAt: new Date(),
    }

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mokerUser)

    const result = await userService.findOneUser(1)
    console.log(result)

    expect(prismaService.user.findFirst).toHaveBeenCalledWith({
      where: {
        id: 1
      }, select: {
        id: true,
        name: true,
        email: true,
        Task: true
      }
    })

    expect(result).toEqual(mokerUser)
  })

  it('should thorw error exception when user is not found', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

    await expect(userService.findOneUser(1)).rejects.toThrow(
      new HttpException('Usuario Não encontrado', HttpStatus.BAD_REQUEST)
    )

    expect(prismaService.user.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      select: {
        id: true,
        name: true,
        email: true,
        Task: true,
      }
    })
  })

  it('shout thorw error exeption when user is not create', async () => {


    const createUserDto: CreateUserDto = {
      email: 'matheus@teste.com',
      name: 'Matheus',
      password: '123123'
    }

    jest.spyOn(hashingService, 'hash').mockResolvedValue('HASH_MOCK_EXEMPLO')
    jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error('Data base error'))



    await expect(userService.create(createUserDto)).rejects.toThrow(
      new HttpException('Falha ao cadastrar', HttpStatus.BAD_REQUEST)
    )

    expect(hashingService.hash).toHaveBeenCalledWith(createUserDto.password)

    expect(prismaService.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: createUserDto.email,
          name: createUserDto.name,
          passwordHash: 'HASH_MOCK_EXEMPLO'
        }),
      })
    );
  })
})