# EmojiSuggest
 Automatically combining emoji symbols to create blends.

## Usage
Navigate to api folder, from here use:
```bash
npm run build
```
followed by:
```bash
npm run deploy
```
if using pm2. If not, use:
```bash
npm start
```

## Adjusting Emoji Blend Images
All emoji blends are output as .png files, their size and other properties can be adjusted in the function combineIcons from emojitools.js.

```js
    /*
    Combines two images into one, 
    finds images of emoji based on hexcode, can only combine emoji found in the installed OpenMoji library
    hex1 is the overlay, hex2 is the base emoji 
    */
    combineIcons: function (hex1, hex2, callback) {
        const overallHeight = 618; // Size of final export
        const overlayHeight = 350; // Size of the overlay
        // No width values because emoji icons are square.

        const anchor = 'southeast'; // changes position of hex1 image relative to hex2

        if(Array.isArray(hex1)){
            hex1 = hex1[1];
        }
        else if(hex1.includes(',')){
            hex1 = hex1.split(',')
            hex1 = hex1[1];
        }
        sharp('./public/images/' + hex1 + '.png')
            .resize({
                fit: sharp.fit.contain,
                height: overlayHeight 
            })
            .toBuffer({ resolveWithObject: true })
            .then(({ data, info }) => {
                sharp('./public/images/' + hex2 + '.png')
                    .resize(overallHeight, overallHeight) 
                    .composite([{
                        input: data, 
                        gravity: anchor 
                    }])
                    .toFile('./public/blends/' + hex1 + hex2 + '.png', function (err) {
                        callback();
                    });
            })
            .catch(err => {
                console.log("Error: " + typeof hex1 + " + " + hex2, err);
            });
    }
```