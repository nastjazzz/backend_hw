const searchForm = document.querySelector('.form-search-books');

searchForm.addEventListener('submit', (e) => {
  // e.preventDefault();
  // const formData = new FormData(searchForm);
  // const author = formData.get('authors');
  // fetch(`http://localhost:8080/api/search`, {
  //   method: 'POST',
  //   body: formData,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     console.log(result);
  //     window.location = '/search-result/' + author;
  //   })
  //   .catch((error) => console.log('Error:', error));
});
