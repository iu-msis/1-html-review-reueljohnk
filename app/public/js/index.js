const Offer = {
    data() {
        return {
            "students": [],
            "selectedStudent":null,
            "offers": []
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date).format("DD MMM YYYY")
        }
    },
    methods: {
        selectStudent(s) {
            console.log("Clicked", s);
            if (this.selectedStudent == s) {
                return;
            }

            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(s);
        },
        fetchStudentData() {
            fetch('/api/student')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.students = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        fetchOfferData(s) {
            fetch('/api/offer/?student='+s.id)
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.offers = responseJson;
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    },
    created() {
        this.fetchStudentData();
    }
}

Vue.createApp(Offer).mount('#bioApp');