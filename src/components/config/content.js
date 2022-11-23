const content = {
  a: [],
  getBaseURL() {
    return 'http://localhost:8085';
  },
  async getData() {
    console.log('Enter get data');
    if (this.a.length === 0) {
      // call api if anything is missing
      const response = await fetch('/preload-backend-data.json');
      const data = await response.json();
      console.log(data);
      const arrayIfNotArray = (val) => (Array.isArray(val) ? val : []);
      this.a = arrayIfNotArray(data.a);
    }
    return {
      a: this.a,
    };
  },

};

export default content;
