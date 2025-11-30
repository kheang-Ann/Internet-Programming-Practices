<template>
  <header class="header" style="padding: 1px;">
    <!-- LEFT: CATEGORIES BUTTON -->
    <button class="category-btn">
      <i class="ri-microsoft-line"></i>
      Browse All Categories
      <i class="ri-arrow-down-s-line"></i>
    </button>

    <!-- CENTER: NAV MENU -->
    <nav class="nav-menu">
      <router-link
        v-for="item in navItems"
        :key="item.label"
        :to="item.route"
        class="nav-item"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        <span>{{ item.label }}</span>
        <i v-if="item.dropdown" class="ri-arrow-down-s-line"></i>
      </router-link>
    </nav>

    <!-- RIGHT: CONTACT -->
    <div class="contact-box">
      <i class="ri-headphone-line"></i>
      <div>
        <div class="phone-number">099 777 888</div>
        <div class="support-text">24/7 Support Center</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { label: "Hot Deals", icon: "ri-fire-line", route: "/hot-deals"},
        { label: "Home", route: "/" },
        { label: "Food", dropdown: true},
        { label: "Vegetables", dropdown: true},
        { label: "Drink" },
        { label: "Cookies" },
        { label: "Meat & Seafood", dropdown: true },
        { label: "Bakery" },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fff;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3bb77e;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.category-btn:hover {
  background: #2fa567;
}

.nav-menu {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  cursor: pointer;
}

.nav-item:hover {
  color: #3bb77e;
}

.contact-box {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  padding-right: 20px;
}

.phone-number {
  font-weight: bold;
  color: #3bb77e;
}

.support-text {
  font-size: 12px;
  color: gray;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-menu {
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
  }

  .contact-box {
    margin-top: 10px;
  }
}
</style>
