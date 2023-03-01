import './css/styles.css';
import './css/micromodal.css';
import './images/lobby.jpg';
import MicroModal from 'micromodal';

MicroModal.init();

const getRoom = document.getElementById('getRoom');
const modal = document.getElementById('modal');

getRoom.addEventListener('click', (event) => {
  event.preventDefault();
  showModal();
});

const showModal = () => {
  MicroModal.show('modal-1');
}