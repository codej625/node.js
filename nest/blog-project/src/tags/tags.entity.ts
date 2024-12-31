import { CommonEntity } from '../common/entities/common.entity' // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, ManyToMany } from 'typeorm'
import { BlogEntity } from '../blogs/blogs.entity'

@Entity({
  name: 'TAG',
})
export class TagEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string

  //* Relation */

  @ManyToMany(() => BlogEntity, (blog: BlogEntity) => blog.tags)
  blogs: BlogEntity[]
}
