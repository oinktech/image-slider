# Image Slider Plugin

Welcome to the Image Slider Plugin! This plugin allows you to easily add a responsive and customizable image slider to your website. It supports multiple sliders on the same page and offers a variety of transition effects and settings.

## 目錄

- [English](#english)
- [繁體中文](#繁體中文)

## English

### Overview

The Image Slider Plugin enables you to integrate image sliders into your webpage with ease. You can customize the slider's appearance, transition effects, and control its autoplay settings. The plugin is designed to be flexible and user-friendly, allowing multiple sliders to be used on the same page.

### Features

- Multiple sliders support
- Customizable slide speed and autoplay interval
- Transition effects: fade, slide
- Navigation buttons and pagination
- Responsive design
- Mobile touch support

### Installation

To use the Image Slider Plugin, include the following script in your HTML file:

```html
<script src="https://oinktech.github.io/image-slider/@1-0-0/script.js"></script>
```

### Usage

1. **Add HTML Structure**

   Include the slider containers in your HTML:

   ```html
   <div class="slider-container">
       <div class="slider" id="slider1"></div>
   </div>
   <div class="slider-container">
       <div class="slider" id="slider2"></div>
   </div>
   ```

2. **Initialize the Sliders**

   Create a `script.js` file to initialize your sliders:

   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       const sliders = [
           {
               id: 'slider1',
               imageUrls: [
                   'https://via.placeholder.com/800x400?text=Image+1',
                   'https://via.placeholder.com/800x400?text=Image+2',
                   'https://via.placeholder.com/800x400?text=Image+3'
               ],
               options: {
                   slideSpeed: 0.5,
                   autoPlayInterval: 3000,
                   transitionEffect: 'fade'
               }
           },
           {
               id: 'slider2',
               imageUrls: [
                   'https://via.placeholder.com/800x400?text=Image+A',
                   'https://via.placeholder.com/800x400?text=Image+B',
                   'https://via.placeholder.com/800x400?text=Image+C'
               ],
               options: {
                   slideSpeed: 0.7,
                   autoPlayInterval: 4000,
                   transitionEffect: 'slide'
               }
           }
       ];

       sliders.forEach(slider => {
           const script = document.createElement('script');
           script.src = 'https://oinktech.github.io/image-slider/@1-0-0/script.js';
           script.defer = true;
           script.onload = function() {
               if (window.initImageSlider) {
                   window.initImageSlider(slider.id, slider.imageUrls, slider.options);
               }
           };
           document.body.appendChild(script);
       });
   });
   ```

### Configuration

- `id` - The ID of the slider container.
- `imageUrls` - An array of image URLs for the slides.
- `options`:
  - `slideSpeed` - Duration of slide transition in seconds.
  - `autoPlayInterval` - Interval between slides in milliseconds.
  - `transitionEffect` - Transition effect ('fade' or 'slide').

### Technical Support

For technical support, please visit our [GitHub Issues Page](https://github.com/oinktech/image-slider/issues).

### Contributing

We welcome contributions to improve this plugin. Please refer to our [Contributing Guide](https://github.com/oinktech/image-slider/CONTRIBUTING.md) for more details.

### License

This plugin is licensed under the MIT License. See the [LICENSE](https://github.com/oinktech/image-slider/LICENSE) file for more details.

---

## 繁體中文

### 概述

Image Slider 插件使您可以輕鬆地將圖片滑塊整合到您的網頁中。您可以自訂滑塊的外觀、過渡效果，並控制自動播放設置。此插件設計靈活且使用者友好，支持在同一頁面上使用多個滑塊。

### 特點

- 支持多個滑塊
- 自訂滑動速度和自動播放間隔
- 過渡效果：淡入淡出、滑動
- 導航按鈕和分頁
- 響應式設計
- 支持移動觸控

### 安裝

要使用 Image Slider 插件，請在您的 HTML 文件中包含以下腳本：

```html
<script src="https://oinktech.github.io/image-slider/@1-0-0/script.js"></script>
```

### 使用方法

1. **添加 HTML 結構**

   在您的 HTML 中包含滑塊容器：

   ```html
   <div class="slider-container">
       <div class="slider" id="slider1"></div>
   </div>
   <div class="slider-container">
       <div class="slider" id="slider2"></div>
   </div>
   ```

2. **初始化滑塊**

   創建 `script.js` 文件以初始化滑塊：

   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       const sliders = [
           {
               id: 'slider1',
               imageUrls: [
                   'https://via.placeholder.com/800x400?text=Image+1',
                   'https://via.placeholder.com/800x400?text=Image+2',
                   'https://via.placeholder.com/800x400?text=Image+3'
               ],
               options: {
                   slideSpeed: 0.5,
                   autoPlayInterval: 3000,
                   transitionEffect: 'fade'
               }
           },
           {
               id: 'slider2',
               imageUrls: [
                   'https://via.placeholder.com/800x400?text=Image+A',
                   'https://via.placeholder.com/800x400?text=Image+B',
                   'https://via.placeholder.com/800x400?text=Image+C'
               ],
               options: {
                   slideSpeed: 0.7,
                   autoPlayInterval: 4000,
                   transitionEffect: 'slide'
               }
           }
       ];

       sliders.forEach(slider => {
           const script = document.createElement('script');
           script.src = 'https://oinktech.github.io/image-slider/@1-0-0/script.js';
           script.defer = true;
           script.onload = function() {
               if (window.initImageSlider) {
                   window.initImageSlider(slider.id, slider.imageUrls, slider.options);
               }
           };
           document.body.appendChild(script);
       });
   });
   ```

### 配置

- `id` - 滑塊容器的 ID。
- `imageUrls` - 圖片 URL 的數組。
- `options`:
  - `slideSpeed` - 圖片滑動過渡的持續時間（以秒為單位）。
  - `autoPlayInterval` - 圖片之間的間隔（以毫秒為單位）。
  - `transitionEffect` - 過渡效果（'fade' 或 'slide'）。

### 技術支持

如需技術支持，請訪問我們的 [GitHub 問題頁面](https://github.com/oinktech/image-slider/issues)。

### 貢獻

我們歡迎您對此插件進行貢獻。詳細信息請參見我們的 [貢獻指南](https://github.com/oinktech/image-slider/CONTRIBUTING.md)。

### 授權

此插件根據 MIT 授權條款授權。更多詳情請參閱 [LICENSE](https://github.com/oinktech/image-slider/LICENSE) 文件。
