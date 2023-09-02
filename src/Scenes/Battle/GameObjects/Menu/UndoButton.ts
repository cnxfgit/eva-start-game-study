import {GameObject} from '@eva/eva.js';
import {Sprite} from '@eva/plugin-renderer-sprite';
import {Event} from '@eva/plugin-renderer-event';
import EventManager from "../../../../Runtime/EventManager";
import {EVENT_ENUM} from "../../../../Enums";

const UndoButton = () => {
  const undo = new GameObject('undo', {
    size: {
      width: 50,
      height: 64
    },
    origin: {
      x: 0.5,
      y: 0.5
    }
  });
  undo.addComponent(new Sprite({
    resource: 'ctrl',
    spriteName: 'ctrl (9).png'
  }));

  const event = undo.addComponent(new Event());
  const endHandler = () => {
    EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP);
  };

  event.on('touchend', endHandler);
  event.on('touchendoutside', endHandler);

  return undo;
}

export default UndoButton;