# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://github.com/itksweb/draggable-todo)
- Live Site URL: [live site URL](https://draggable-todo-murex.vercel.app/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/)

### What I learned

```css
/*by applying this css approach I was able to achieve the gradient border color on hover*/
.toggle-brdr:hover {
  border-color: transparent;
  background: linear-gradient(var(--todo-bg), var(--todo-bg)) padding-box, var(
        --check-bg
      ) border-box;
  border-radius: calc(infinity * 1px);
}
```

```jsx
// I learnt how React helps manage drag and drop in an almost seamless way
const Todo = ({
  todo,
  toggleActive,
  removeTodo,
  setDragIndex,
  setDropIndex,
}) => {
  const { text, active, index } = todo;

  const handleDragStart = () => setDragIndex(index);

  // Function to handle the drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setDropIndex(index);
  };
  return (
    <li
      draggable
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      className="flex justify-between items-center w-full gap-2 xls:gap-3 sm:gap-5 p-2 sm:p-4 md:p-5 border-b todo-brdr group"
    >
      {/* Other code goes in here */}
    </li>
  );
};
```

```jsx
//The entire logic for my drag and drop is found here
useEffect(() => {
    if (selected === "All") {
      if (dropIndex !== -1) {
        const draggedItem = [...todos][dragIndex];
        let newSortedItems = [...todos]; // create a copy of the array
        newSortedItems.splice(dragIndex, 1); // remove the dragged item
        newSortedItems.splice(dropIndex, 0, draggedItem); // insert the dragged item at the new index
        setTodos([...newSortedItems]); // update the state with the new sorted array
        setDragIndex(-1);
        setDropIndex(-1);
        localStorage.setItem("todos", JSON.stringify([...newSortedItems]));
      }
    }
  }, [selected, dropIndex, dragIndex, todos]);
```

### Useful resources

- [geeksforgeeks](https://www.geeksforgeeks.org/css/gradient-borders/) - This webpage was really helpful. It's resource helped achieve the the gradient border color that is rounded. I gladly recommend them to everyone in need of coding/web development assistance.

## Author

- WhatsApp - [here](https://wa.me/2348060719978)
- LinkedIn - [here](https://www.linkedin.com/in/kingsleyikpefan)
