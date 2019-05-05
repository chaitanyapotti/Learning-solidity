const data = {
  title: "The VueJS Instance",
  showParagraph: false
};

Vue.component("hello", {
  template: "<h1>Hello!</h1>"
});

var vm1 = new Vue({
  data: data,
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle("The VueJS Instance (Updated)");
      this.$refs.myButton.innerText = "show";
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
  computed: {
    lowercaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: {
      handler: function(value) {
        alert("Title changed, new value: " + value);
      }
    }
  }
});

vm1.$mount("#app1");

setTimeout(() => {
  vm1.title = "Changed by timeout";
  vm1.show();
}, 3000);

var vm2 = new Vue({
  el: "#app2",
  data: {
    title: "The Second Instance"
  },
  methods: {
    onChange() {
      vm1.title = "Changed";
    }
  }
});

var vm3 = new Vue({
  template: "<h1>Hello!</h1>"
});

// vm3.$mount("#app3");
vm3.$mount();

document.getElementById("app3").appendChild(vm3.$el);

// refs are tricky - because changes made by refs are not interactive and will be overwritten
// hence, use refs mostly to get and not set dom values
