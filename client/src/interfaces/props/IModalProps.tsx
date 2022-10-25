export default interface IModalProps {
  open: boolean;
  handleClose: () => void;
  listPeople:any[];
  title:String;
}
