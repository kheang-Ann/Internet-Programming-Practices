<template>
  <!-- <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css"
    rel="stylesheet"
  /> -->
  <div>
    <div class="hero-wrapper">
      <img :src="heroBg" class="hero-bg" />
      <div class="hero-content">
        <img :src="heroMain" class="hero-main" />
      </div>
          <h1 class="header_1">Don't miss amazing grocery deals</h1>
          <h2 class="header_2">Sign up for the daily newsletter</h2>
          <div class="search-bar">
            <i class="ri-telegram-2-line" aria-hidden="true"></i>
            <input
              class="search-input"
              type="email"
              v-model="email"
              @keyup.enter="subscribe"
              placeholder="Your Email Address"
              aria-label="Email address"
            />
            <button>subscribe</button>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    const heroBg = new URL('@/assets/1.png', import.meta.url).href
    const heroMain = new URL('@/assets/2.png', import.meta.url).href
    return { heroBg, heroMain, email: '' }
  },
  methods: {
    subscribe() {
      if (!this.email) return
      // emit event for parent components and log for local debug
      this.$emit('subscribe', this.email)
      console.log('Subscribed with', this.email)
      this.email = ''
    }
  },
  
}
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  /* Add background color here if your image is transparent */
  background-color: #f8dbb5;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.header_1 {
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin-right: 60%;
  font-size: 50px;
  gap: 25px;
  max-width: 1200px;
  flex-wrap: wrap;
  z-index: 100;
  position: relative;
}

.search-bar {
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 25px;
  display: flex;
  height: 50px;
  width: 442px;
  background-color: white;
  z-index: 100;
  position: relative;
  /* justify-content: center; */
  align-items: center;
}

.search-bar i {
  padding-left: 15px;
}

.search-bar button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background: #3bb77e;
  cursor: pointer;
  border: none;

}

.search-bar button:hover {
  background: #75b73b;
  color: white;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
  background-color: transparent;
}

.header_2 {
  color: gray;
  padding-left: 20px;
  z-index: 100;
  position: relative;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
}

.hero-main {
  /* Adjusted to fit better inside the wrapper */
  max-height: 90%;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .hero-wrapper {
    height: 300px;
  }

  .header_1 {
    font-size: 30px;
    margin-right: 40%;
  }

  .search-bar {
    width: 300px;
  }

  .hero-main {
    max-height: 80%;
  }
}

</style>
