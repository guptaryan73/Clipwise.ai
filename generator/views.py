import json

import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Script


def index(request):
    return render(request, 'generator/index.html')

@csrf_exempt
def generate_script(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt', '')
            
            # Call X.AI API
            headers = {
                'Authorization': f'Bearer {settings.XAI_API_KEY}',
                'Content-Type': 'application/json'
            }
            
            api_data = {
                'prompt': prompt,
                'max_tokens': 1000,
                'temperature': 0.7
            }
            
            response = requests.post(
                'https://api.x.ai/v1/generate',
                headers=headers,
                json=api_data
            )
            
            if response.status_code == 200:
                generated_text = response.json().get('text', '')
                
                # Save the script
                script = Script.objects.create(
                    prompt=prompt,
                    generated_script=generated_text
                )
                
                return JsonResponse({
                    'success': True,
                    'script': generated_text,
                    'script_id': script.id
                })
            else:
                return JsonResponse({
                    'success': False,
                    'error': 'Failed to generate script'
                }, status=500)
                
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    return JsonResponse({
        'success': False,
        'error': 'Invalid request method'
    }, status=400)

def get_saved_scripts(request):
    scripts = Script.objects.all()[:10]  # Get last 10 scripts
    scripts_data = [{
        'id': script.id,
        'prompt': script.prompt,
        'generated_script': script.generated_script,
        'created_at': script.created_at.strftime('%Y-%m-%d %H:%M')
    } for script in scripts]
    
    return JsonResponse({
        'success': True,
        'scripts': scripts_data
    }) 