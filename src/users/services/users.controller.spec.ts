
import { UsersController } from "../users.controller"


describe('Usesr Controller', ()=>{
    let controller: UsersController; 

    const usersServiceMock = {
        findOneUser: jest.fn(), 
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        uploadAvatar: jest.fn()

    }


    beforeEach(async ()=>{
        controller = new UsersController(usersServiceMock as any)
    })

    it('should findOneUser', async ()=>{
        const userId = 1

        await controller.findOneUser(userId)

        expect(usersServiceMock.findOneUser).toHaveBeenCalledWith(userId)
    })
})