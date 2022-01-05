const createForm = document.querySelector('.form-create-book');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(createForm);

  fetch('http://localhost:3000/api/books', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      window.location = '/book/' + result.id;
    })
    .catch((error) => console.log('Error:', error));
});
