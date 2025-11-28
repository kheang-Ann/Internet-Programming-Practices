<template>
  <header class="header" style="padding: 1px;">
    <div class = "icon">
      <!-- Icon left -->
      <img :src="icon" alt="">
    </div>

    <!-- Search bar center -->
    <div class="container">
      <div class="search-box" role="search">
        <button class="category-btn" aria-label="Choose category" type="button">
          <span class="category-label">{{ navItems[4].cate }}</span>
          <i :class="navItems[4].cat"></i>
        </button>

        <input
          class="search-input"
          type="text"
          placeholder="Search for items"
          aria-label="Search for items"
        />

        <button class="search-btn" aria-label="Search" type="button">
          <i :class="navItems[5].fint"></i>
        </button>
      </div>
    </div>

    <!-- Right icon of page -->
    <nav class="nav-menu">
      <div
        v-for = "item in navItems"
        :key = "item.label"
        class = "nav-item"
      >
        <i v-if = "item.acc" :class="item.acc" ></i>
        <i v-if = "item.com" :class="item.com" ></i>
        <i v-if = "item.wish" :class="item.wish" ></i>
        <i v-if = "item.cart" :class="item.cart" ></i>
        <span>{{ item.label }}</span>
      </div>
    </nav>

  </header>
</template>

<script>
export default {
  data(){
    const icon = new URL('@/assets/icon.png', import.meta.url).href
    return {
      navItems: [
        {label: "Account", acc: "ri-user-3-line"},
        {label: "Compare", com: "ri-refresh-line"},
        {label: "Wishlist", wish: "ri-heart-2-line"},
        {label: "Cart", cart: "ri-shopping-cart-2-line"},
        {cate: "All Categories", cat: "ri-arrow-down-s-line"},
        {fint: "ri-search-line"},
      ],
      icon
    };
  },
};
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.icon img {
  width: 150px;
  height: auto;
}

.container{
  display:flex;
  justify-content:center; /* center the search box */
  flex: 1; /* allow space between icon and menu */
}

.search-box{
  display:flex;
  align-items:center;
  width: 700px; /* set a reasonable width, adjust as necessary */
  height: 48px;
  border: 2px solid #cdeed5; /* light green border similar to screenshot */
  border-radius: 12px;
  padding: 6px 10px;
  gap: 8px;
  box-sizing: border-box;
  background-color: #fff;
}

.category-btn{
  display:flex;
  align-items:center;
  gap:6px;
  padding: 4px 6px;
  border: none;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  border-right: 1px solid #e6f2ea;
  padding-right: 12px;
}

.category-btn:hover {
  color: green;
}

.category-label{
  font-size:14px
}

.search-input{
  flex:1;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 8px;
  font-size: 14px;
  background: transparent;
}

.search-btn{
  border: none;
  background: transparent;
  display:flex;
  align-items:center;
  justify-content:center;
  width:34px;
  height:34px;
  border-radius: 8px;
  cursor:pointer;
}

.search-btn:hover {
  background-color: greenyellow;
}


.nav-menu {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-item:hover {
  color: green;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 17px;
  cursor: pointer;
}
</style>
