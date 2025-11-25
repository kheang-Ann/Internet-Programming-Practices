<template>
  <div>
    <div class="hero-wrapper">
      <img :src="heroBg" class="hero-bg" />
      <div class="hero-content">
        <img :src="heroMain" class="hero-main" />
      </div>
          <h1 class="header_1">Don't miss amazing grocery deals</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    const heroBg = new URL('@/assets/1.png', import.meta.url).href
    const heroMain = new URL('@/assets/2.png', import.meta.url).href
    return { heroBg, heroMain }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    Image: {
      required: true,
    }
  }
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
  padding: 15px;
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

</style>
