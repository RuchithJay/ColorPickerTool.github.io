document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const colorDisplay = document.getElementById('colorDisplay');
    const colorValue = document.getElementById('colorValue');
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const alphaSlider = document.getElementById('alpha');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');
    const alphaValue = document.getElementById('alphaValue');
    const colorMode = document.getElementById('colorMode');
    const copyBtn = document.getElementById('copyBtn');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const body = document.body;
    
    // Initial color values
    let red = parseInt(redSlider.value);
    let green = parseInt(greenSlider.value);
    let blue = parseInt(blueSlider.value);
    let alpha = parseInt(alphaSlider.value) / 100;
    
    // Update the color display
    function updateColor() {
        // Update the display color
        colorDisplay.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        
        // Update the color value text based on selected mode
        switch(colorMode.value) {
            case 'hex':
                colorValue.textContent = rgbToHex(red, green, blue);
                break;
            case 'rgb':
                colorValue.textContent = `rgb(${red}, ${green}, ${blue})`;
                break;
            case 'hsl':
                const hsl = rgbToHsl(red, green, blue);
                colorValue.textContent = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
                break;
        }
        
        // Update slider value displays
        redValue.textContent = red;
        greenValue.textContent = green;
        blueValue.textContent = blue;
        alphaValue.textContent = `${Math.round(alpha * 100)}%`;
        
        // Adjust text color for better visibility
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
        colorValue.style.color = brightness > 128 ? '#000' : '#fff';
    }
    
    // Convert RGB to HEX
    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
    
    // Convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h /= 6;
        }
        
        return {
            h: h * 360,
            s: s * 100,
            l: l * 100
        };
    }
    
    // Event listeners for sliders
    redSlider.addEventListener('input', function() {
        red = parseInt(this.value);
        updateColor();
        updateBackgroundColor();
    });
    
    greenSlider.addEventListener('input', function() {
        green = parseInt(this.value);
        updateColor();
        updateBackgroundColor();
    });
    
    blueSlider.addEventListener('input', function() {
        blue = parseInt(this.value);
        updateColor();
        updateBackgroundColor();
    });
    
    alphaSlider.addEventListener('input', function() {
        alpha = parseInt(this.value) / 100;
        updateColor();
        updateBackgroundColor();
    });
    
    // Event listener for color mode change
    colorMode.addEventListener('change', updateColor);
    
    // Copy to clipboard functionality
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(colorValue.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });
    
    // Function to update the background color
    function updateBackgroundColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        const alpha = alphaSlider.value / 100; // Convert alpha to a 0-1 range

        // Set the body's background color
        body.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    // Initial color update
    updateColor();
    updateBackgroundColor();

    // Function to update the theme color
function updateThemeColor() {
    const red = redSlider.value;
    const green = greenSlider.value;
    const blue = blueSlider.value;
    const alpha = alphaSlider.value / 100; // Convert alpha to 0-1 range

    // Convert RGBA to HEX for the meta tag
    const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + +blue).toString(16).slice(1)}`;

    // Update the meta tag's content attribute
    metaThemeColor.setAttribute('content', hexColor);
}

// Add event listeners to the sliders
redSlider.addEventListener('input', updateThemeColor);
greenSlider.addEventListener('input', updateThemeColor);
blueSlider.addEventListener('input', updateThemeColor);
alphaSlider.addEventListener('input', updateThemeColor);

// Initialize the theme color
updateThemeColor();
});

// Update the footer year dynamically
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});