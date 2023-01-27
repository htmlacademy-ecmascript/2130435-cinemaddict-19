export default function deleteCurrentElementArray(array, currentElement) {
  const index = array.findIndex((element) => {
    if(element?.id) {
      return element.id === currentElement.id;
    }

    return element === currentElement.id;
  });

  if (index === -1) {
    throw new Error('Can\'t delete unexisting task');
  }

  array = [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];

}
