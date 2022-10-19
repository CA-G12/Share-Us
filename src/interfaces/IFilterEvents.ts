import { Op } from 'sequelize'
export default interface IBetweenFromAndTo {
  [Op.and]: { [Op.gte]: string; [Op.lte]: string };
}
