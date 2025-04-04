import { Injectable } from '@nestjs/common';
import { Author } from '../../core/entities';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos';

@Injectable()
export class AuthorFactoryService {
  createNewAuthor(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new Author();
    newAuthor.firstName = createAuthorDto.firstName;
    newAuthor.lastName = createAuthorDto.lastName;

    return newAuthor;
  }

  updateAuthor(updateAuthorDto: UpdateAuthorDto) {
    const newAuthor = new Author();
    newAuthor.firstName = updateAuthorDto.firstName as string;
    newAuthor.lastName = updateAuthorDto.lastName as string;

    return newAuthor;
  }
}
