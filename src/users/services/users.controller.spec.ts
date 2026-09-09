


import { CreateUserDto } from "../dtos/create.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UsersController } from "../users.controller"


describe('Usesr Controller', () => {
    let controller: UsersController;

    const usersServiceMock = {
        findOneUser: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        uploadAvatar: jest.fn()

    }


    beforeEach(async () => {
        controller = new UsersController(usersServiceMock as any)
    })

    it('should findOneUser', async () => {
        const userId = 1

        await controller.findOneUser(userId)

        expect(usersServiceMock.findOneUser).toHaveBeenCalledWith(userId)
    })

    it('should create a new user', async () => {
        const createUserDto: CreateUserDto = {
            name: 'Matheus',
            email: 'teste@teste.com',
            password: '12345'
        }

        const mockUser = {
            id: 1,
            name: 'Matheus',
            email: 'teste@teste.com',

        };

        (usersServiceMock.create).mockResolvedValue(mockUser)

        const result = await controller.createUser(createUserDto)


        expect(usersServiceMock.create).toHaveBeenCalledWith(createUserDto)

        expect(result).toEqual(mockUser)
    })

    it('shoud update a user', async () => {

        const userId = 1
        const updateUserDto: UpdateUserDto = {

            name: 'Matheus Novo',


        }

        const updateUser = {
            id: userId,
            name: 'Matheus',
            email: 'teste@teste.com',

        }


    })
})
