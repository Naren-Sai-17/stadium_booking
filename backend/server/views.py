# Google authentication
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import environ

env = environ.Env()

# -------------------------------------------
# Code from the official documentation
class GoogleLogin(SocialLoginView): 
    adapter_class = GoogleOAuth2Adapter
    callback_url = str(env('CALL_BACK_URL'))
    client_class = OAuth2Client
# -------------------------------------------
