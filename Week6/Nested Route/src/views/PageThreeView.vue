<script>
export default {
  name: 'PageThreeView',
  data() {
    return {
      messageInput: ''
    }
  },
  methods: {
    goPage1() {
      this.$router.push({
        path: '/page_one',
        query: { message: this.messageToSend }
      });
    },
    goPage2() {
      this.$router.push({
        path: '/page_two',
        query: { message: this.messageToSend }
      });
    },
    goSection(id) {
      this.$router.push({
        path: `/page_three/sections/${id}`,
        query: { message: this.messageToSend }
      });
    },
    isSectionActive(id) {
      return Number(this.$route.params.sectionId) === id;
    }
  },
  computed: {
    messageFromQuery() {
      return this.$route.query.message || '';
    },
    messageToSend() {
      const sectionId = this.$route.params.sectionId;
      let trimmedMessageInput = this.messageInput.trim();
      if (trimmedMessageInput === '') {
        return '';
      }
      if (sectionId) {
        return `Message from Page 1 Section ${sectionId}: ${trimmedMessageInput}`;
      }
      return "Message from Page 1: " + trimmedMessageInput;
    }
  },
}
</script>

<template>
  <header class="header">
    <div class="header-text">Header</div>
    <div class="header-buttons">
      <button @click="goPage1">Page 1</button>
      <button @click="goPage2">Page 2</button>
      <button>Page 3</button>
    </div>
  </header>
  <main>
    <div class="main-container">
      <div class="menu">
        <div class="menu-title">Menu</div>
        <button @click="goSection(1)" :class="{ 'active-section': isSectionActive(1) }">Section1</button>
        <button @click="goSection(2)" :class="{ 'active-section': isSectionActive(2) }">Section2</button>
        <button @click="goSection(3)" :class="{ 'active-section': isSectionActive(3) }">Section3</button>
        <button @click="goSection(4)" :class="{ 'active-section': isSectionActive(4) }">Section4</button>
      </div>
      <div class="page-container">
        <div>Welcome to Page 3</div>
        <router-view></router-view>
        <div class="message-display">
          {{ messageFromQuery }}
        </div>
      </div>
    </div>
  </main>
  <footer class="footer">
    Footer
  </footer>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border: 1px solid black;
}

.header-text {
  font-size: 20px;
}

.header-buttons {
  display: flex;
  margin-left: auto;
  gap: 30px;
}

.header-buttons button {
  background-color: transparent;
  font-size: 20px;
  border: none;
}

.header-buttons :last-child {
  color: red
}

.main-container {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
}

.menu {
  display: flex;
  flex-direction: column;
  font-size: 18px
}

.menu-title {
  padding: 30px;
  border: 1px solid black
}

.menu button {
  background-color: transparent;
  font-size: 18px;
  border: 1px solid black;
  padding: 30px;
}

.active-section {
  background-color: #62b7f0 !important
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 20px;
  gap: 30px;
}

.footer {
  display: flex;
  justify-content: center;
  padding: 30px;
  font-size: 20px;
  border: 1px solid black;
}

.message-block {
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
}

.message-block :last-child {
  padding-right: 100px;
  border: 1px solid black;
}
</style>
