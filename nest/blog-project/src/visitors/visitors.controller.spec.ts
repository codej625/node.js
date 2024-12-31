import { Test, TestingModule } from '@nestjs/testing'
import { VisitorsController } from './visitors.controller'
import { VisitorsService } from './visitors.service'

describe('VisitorsController', () => {
  let controller: VisitorsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsController],
      providers: [VisitorsService],
    }).compile()

    controller = module.get<VisitorsController>(VisitorsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
