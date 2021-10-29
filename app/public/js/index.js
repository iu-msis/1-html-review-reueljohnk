const Offer = {
    data() {
        return {
            "person": undefined,
            "books": [],
            "bookForm": {},
            "selectedBook": null,
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date).format("DD MMM YYYY")
        }
    },
    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.person = responseJson.results[0];
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$" + d;
        },
        fetchBookData() {
            fetch('/api/book/')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.books = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        addBook(evt) {
            // this.bookForm.studentId = this.selectedStudent.id;          
            console.log("Posting!", this.bookForm);
            fetch('api/book/create.php', {
                method: 'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.books = json;

                    // reset the form
                    this.resetBookForm();
                });
        },
        deleteBook(b) {
            if (!confirm("Are you sure you want to delete "+b.title+"?")) {
              return;
            }
            console.log("Delete!", b);
    
            fetch('api/book/delete.php', {
                method:'POST',
                body: JSON.stringify(b),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
    
                // reset the form
                this.resetBookForm();
                this.fetchBookData();
              });
          },
        editBook(evt) {
            //this.offerForm.studentId = this.selectedStudent.id;
            // this.offerForm.id = this.selectedOffer.id;

            console.log("Updating!", this.bookForm);

            fetch('api/book/update.php', {
                method: 'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.books = json;

                    // reset the form
                    this.resetBookForm();
                });
        },
        resetBookForm() {
            this.bookForm = {};
        },
        selectBookToEdit(b) {
            this.selectedBook = b;
            this.bookForm = Object.assign({}, b);
        },
        postBook(evt) {
            if (this.selectedBook === null) {
                this.addBook(evt);
            } else {
                this.editBook(evt);
            }
        },
    },
    created() {
        this.fetchBookData();
        this.fetchUserData();
    }
}

Vue.createApp(Offer).mount('#bioApp');