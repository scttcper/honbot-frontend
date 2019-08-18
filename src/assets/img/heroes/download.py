import os
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

for x in range(0, 400):
    link = f"https://www.heroesofnewerth.com/images/heroes/{x}/icon_128.jpg"
    name = f"{x}_icon_128.jpg"
    filename = os.path.join(os.getcwd(), name)

    if not os.path.isfile(filename):
        print('Downloading: ' + filename)
        try:
            urllib.request.urlretrieve(link, filename)
        except Exception as inst:
            print(inst)
            print('  Encountered unknown error. Continuing.')