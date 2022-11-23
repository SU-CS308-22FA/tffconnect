# Install python, pip, nginx, gunicorn, and postgresql driver
sudo apt-get update
sudo apt-get -y install python3 python3-pip nginx gunicorn libpq-dev

# Install python dependencies
pip3 install -r tffconnect_backend/requirements.txt

# Django
python3 tffconnect_backend/manage.py migrate
python3 tffconnect_backend/manage.py collectstatic --noinput

# Setup gunicorn service
sudo cp config/gunicorn/gunicorn.config /etc/systemd/system/gunicorn.service
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl restart gunicorn

# Setup nginx service
sudo cp config/nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp config/nginx/sites-available/tffconnect /etc/nginx/sites-available/tffconnect
sudo ln -s /etc/nginx/sites-available/tffconnect /etc/nginx/sites-enabled
sudo systemctl enable nginx
sudo systemctl restart nginx
