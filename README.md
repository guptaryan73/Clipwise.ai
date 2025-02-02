# AI Video Script Generator

A web application that generates video scripts using AI, built with Django and the X.AI API. The application features a modern, responsive UI and supports text input, file uploads, and link references to enhance the AI prompt.

## Features

- AI-powered script generation using the X.AI API
- Dynamic text input with support for:
  - Text prompts
  - File uploads (text files)
  - Link references
- Modern, responsive UI built with TailwindCSS
- Save and view previously generated scripts
- Mobile-friendly design

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_script_generator
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root and add your X.AI API key:
```
SECRET_KEY=your-django-secret-key
XAI_API_KEY=your-xai-api-key
```

5. Run database migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Start the development server:
```bash
python manage.py runserver
```

7. Visit `http://localhost:8000` in your web browser.

## Usage

1. Enter your script prompt in the text area
2. Optionally:
   - Upload text files to enhance the prompt
   - Add reference links
3. Click "Generate Script" to create your video script
4. View the generated script and previously saved scripts below

## Technologies Used

- Backend:
  - Django
  - Python
  - X.AI API
- Frontend:
  - HTML
  - TailwindCSS
  - JavaScript
- Database:
  - SQLite (development)

## Limitations

- Currently only supports text file uploads
- Basic link reference implementation
- Uses SQLite database (consider using PostgreSQL for production)

## Future Improvements

- Add support for more file types
- Implement user authentication
- Add script editing and deletion
- Enhance link preview functionality
- Add export options for generated scripts 