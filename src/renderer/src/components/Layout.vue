<template>
  <div class="header">
    <div class="logo">
      <svg viewBox="0 0 513 513" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M256.025.05C117.67-2.678 3.184 107.038.025 245.383a240.703 240.703 0 0085.333 182.613v73.387c0 5.891 4.776 10.667 10.667 10.667a10.67 10.67 0 005.653-1.621l59.456-37.141a264.142 264.142 0 0094.891 17.429c138.355 2.728 252.841-106.988 256-245.333C508.866 107.038 394.38-2.678 256.025.05z"
        />
        <path
          d="M330.518 131.099l-213.825 130.08c-7.387 4.494-5.74 15.711 2.656 17.97l72.009 19.374a9.88 9.88 0 007.703-1.094l32.882-20.003-10.113 37.136a9.88 9.88 0 001.083 7.704l38.561 63.826c4.488 7.427 15.726 5.936 18.003-2.425l65.764-241.49c2.337-8.582-7.092-15.72-14.723-11.078zM266.44 356.177l-24.415-40.411 15.544-57.074c2.336-8.581-7.093-15.719-14.723-11.078l-50.536 30.744-45.592-12.266L319.616 160.91 266.44 356.177z"
          fill="#fff"
        />
      </svg>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
    </div>
    <div class="user-settings">
      <div class="dark-light">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>
      <div class="settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
          />
        </svg>
      </div>
      <img
        class="user-profile"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
      />
    </div>
  </div>
  <div class="layout-container">
    <div class="left-container">
      <slot name="left-container"></slot>
    </div>
    <div class="right-container">
      <slot name="right-container"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style>
.layout-container {
  display: flex;
  .left-container {
    width: 250px;
    background-color: pink;
    height: calc(100vh - 50px);
  }
  .right-container {
    flex: 1;
    background-color: rgb(41, 163, 211);
    height: calc(100vh - 50px);
  }
}

.header {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo {
  color: var(--theme-color);
  width: 38px;
  flex-shrink: 0;

  svg {
    width: 100%;
  }
}

.search-bar {
  height: 80px;
  z-index: 3;
  position: relative;
  margin-left: 280px;

  input {
    height: 100%;
    width: 100%;
    display: block;
    background-color: transparent;
    border: none;
    color: var(--body-color);
    padding: 0 54px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23c1c7cd'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 25px 48%;
    font-family: var(--body-font);
    font-weight: 600;
    font-size: 15px;

    &::placeholder {
      color: var(--input-chat-color);
    }
  }
}

.dark-light {
  width: 22px;
  height: 22px;
  color: var(--settings-icon-color);
  flex-shrink: 0;

  svg {
    width: 100%;
    fill: transparent;
    transition: 0.5s;
  }
}

.user-settings {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  flex-shrink: 0;

  & > * + * {
    margin-left: 14px;
  }
}
.user-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.settings {
  color: var(--settings-icon-color);
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
</style>
