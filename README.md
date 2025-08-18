# Image Processor Client

A React-based web application for uploading, tagging, browsing, and editing images.

## Features

- **Upload Images:** Easily upload images from your device.
- **Tagging:** Add descriptive tags to each image for better organization.
- **Library View:** Browse all uploaded images in a searchable gallery.
- **Search:** Filter images by tag using the search bar.
- **Edit Navigation:** Click on an image to navigate to its edit page.
- **Delete Images:** Remove images from your library.
- **Apply Watermark & Edit:** Edit images and apply watermarks.

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Erenvdmn/Image-Processor-Client.git
    cd Image-Processor-Client
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the App

```sh
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/views/Home.js` — Upload images and add tags.
- `src/views/Library.js` — Browse and search images.
- `src/components/FileUploader.js` — File upload component.
- `src/helpers/ApiManager.js` — API request handler.
- `src/css/Library.css` — Library view styles.

## API Endpoints

The client expects a backend with these endpoints:

- `POST /upload` — Upload image and tag.
- `GET /media` — List all images.
- `GET /media/:id` — List an specified image.
- `GET /image/:id` — Get image details.
- `DELETE /delete/:id` — Delete an image by ID.
- `POST /apply-watermark-and-edit` — Apply watermark and edit an image.

## Customization

- Update API endpoints in `ApiManager.js` if needed.
- Modify CSS files for custom styles.

## Project Structure

```
src/
  ├── css/
  ├── components/
  ├── views/
  ├── App.js
  └── helpers/
```

## License

MIT

---

Built with