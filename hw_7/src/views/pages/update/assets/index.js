const updateForm = document.querySelector('.form-update-book');

updateForm.addEventListener('submit', (e) => {
  console.log('aaa');
  e.preventDefault();
  const formData = new FormData(updateForm);

  const id = window.location.href.split('/update/')[1];
  console.log(`http://localhost:5000/api/book/${id}`);

  fetch(`http://localhost:5000/api/book/${id}`, {
    method: 'PUT',
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      window.location = '/book/' + result.id;
    })
    .catch((error) => console.log('Error:', error));
});
