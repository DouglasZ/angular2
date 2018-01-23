import{ DaoInterface } from './dao.interface';
import{ AnimalDao } from './animal-dao';
import{ Animal } from '../aula07-classes/animal';

let dao: DaoInterface = new AnimalDao();
let animal: Animal = new Animal('Rex');
dao.insert(animal);