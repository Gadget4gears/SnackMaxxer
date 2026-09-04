// app.js

// 1. Updated Multi-Category CSV Data (Fallback backup)
const rawCSVData = `name,price,categories,vibes,image,description
Nerds Gummy Clusters,3.99,SWEET|SOUR,WILD|CHAOTIC|CHEEKY,assets/nerds_gummy_clusters.png,~WOW!~
Haribo Gummy Bears,2.69,SWEET,HYPER|WILD|SASSY,assets/haribo_gummy_bears.png,*CUTE*.
Mike and Ikes,2.69,SWEET,HYPER|NORMIE,assets/mike_and_ike.png,The Bud Light of pill-shaped candy.
Jack Links Beef Jerky,2.89,SAVORY,RAVENOUS|INSECURE,assets/jack_links_beef_jerky.png,You just spent a third of your allowance on 2 good bites and some meat-essenced *air*.
Jack Links Beef Tender Bites,2.89,SAVORY,HEALTHY|SELF-REFLECTIVE,assets/jack_links_beef_tender_bites.png,Slightly better than normal beef jerky. You're making progress and I'm proud of you.
Peanut M&Ms,2.69,SWEET|SALTY|SAVORY,CHIC|STYLISH,assets/peanut_m&ms.png,I think the pretzel ones are better. Call me biased.
Kit Kat,2.49,SWEET,CHEEKY|ELEGANT,assets/kitkat.png,You're sharing that. Right...?
Reese's Peanut Butter Cups,2.49,SWEET|SAVORY,CHIC|COSMOPOLITAN,assets/reeses.png,Peanut BETTER than a KitKat.
Kinder Bueno,2.49,SWEET,NOSTALGIC|HYPER,assets/kinder_bueno.png,Have a good day at school sweetie!
Almond Joy,2.49,SWEET,IN DENIAL|DESPERATE,assets/almond_joy.png,"*No*, it's not a "healthy" candy bar. Let's rip that band-aid off right now."
Cookie Dough Bites,2.49,SWEET,NOSTALGIC|CINEPHILE,assets/cookie_dough_bites.png,Ahh… makes me miss Blockbuster.
Snickers Minis,2.69,SWEET|SALTY,RAVENOUS|SPOOKY,assets/snickers_minis.png,"Personally, I'm a full-size candy bar kinda guy."
Banana Bread Granola Bakes,1.99,SWEET,HEALTHY|ELEGANT,assets/banana_bread_granola_bakes.png,"Peanut free, Tree nut free, Dairy free, Soy free, Thankfully not flavor free."
BelVita Blueberry Breakfast Biscuits,1.89,SWEET,RAVENOUS|INSECURE,assets/belvita_breakfast_biscuits.png,Breakfast my *a***.
Gatorade Chocolate Chip Protein Bar,3.49,SWEET|SALTY|LITERALLY ASBESTOS,INSECURE|CHAOTIC,assets/gatorade_chocolate_protein_bar.png,Overbaked styrofoam beads coated in a layer of cheap and saccharine chocolate. Finished with that chalky aftertaste gym bros love.
Chocolate Chip Clif Bar,2.89,SWEET,"HEALTHY"|OUTDOORSY|BRAVE,assets/chocolate_chip_clif_bar.png,"Oh, you like Clif bars? Free solo El Capitan right now."
Peanut Butter Filled Pretzels,1.89,SAVORY|SALTY,NOSTALGIC|CHEEKY,assets/peanut_butter_filled_pretzels.png,Don't forget to blow the *dust* off that bag.
Shelled Pistachios,2.29,SALTY|SAVORY|BITTER,ELITIST|HEALTHY,assets/shelled_pistachios.png,You healthy ~bastard~.
Planters Flamin' Hot Peanuts,1.49,SALTY|SPICY|SAVORY,SASSY|WILD,assets/flamin_hot_peanuts.png,SPICY. *clap* \\nCHEAP. *clap* \\nYES. *clap*
Planters Salted Cashews,2.19,SALTY|SAVORY,HEALTHY|ELEGANT,assets/salted_cashews.png,You're the coolest gas station vegan I know.
Welches Strawberry Fruit 'n Yogurt Snacks,3.49,SWEET,CHEEKY|WILD,assets/strawberry_fruit_n_yogurt.png,The closest you can get to doing recreational drugs at work.
Brown Sugar Pop Tarts,1.89,SWEET,HYPER|NAUGHTY|DESPERATE,assets/brown_sugar_pop_tarts.png,"… you know there's a strawberry one right there, right?"
Strawberry Pop Tarts,1.89,SWEET,HYPER|NAUGHTY,assets/strawberry_pop_tarts.png,"Cheat day, eh? How many times is that this week?"
Rice Krispies Treats,1.89,SWEET,NOSTALGIC|SELF-REFLECTIVE,assets/rice_krispies_treats.png,*Oh no!* Mommy forgot to pack your lunch!
Strawberry Vanilla Croissant,2.39,SWEET|SAVORY,DESPERATE|BRAVE,assets/strawberry_vanilla_croissant.png,It has a certain... \\nJe ne sais- *gags*.
Tostitos Meduim Nacho Cheese Dip,2.09,SAVORY|SALTY,RAVENOUS|TRASHY,assets/nacho_cheese_dip.png,*Pleaseee* tell me you're buying chips with this.
Sunbelt Bakery Fudge Dipped Chocolate Chip Granola Bar,1.59,SWEET,BASIC|DESPERATE,assets/sunbelt_bar.png,"You came here with under $2 looking for a ~chocolate~ fix? *Sorry pal*, this is it."
Cinnamon Toast Crunch Treat,2.59,SALTY|SWEET,ELEGANT|TRASHY,assets/cinnamon_toast_treat.png,Rice Krispies should have seen this coming. Game over.
Wrigleys Extra Polar Ice Gum,2.09,SWEET|MINTY,CHIC|FRESH|CRUEL,assets/extra_polar_ice_gum.png,*SMACK. SMACK. SMACK.*
Cheetos Flamin' Hot,1.69,SPICY|SAVORY|SALTY,SASSY|VENGEFUL,assets/hot_cheetos.png,Pairs well with your grubby keyboard.
Miss Vickie's Spicy Dill Pickle Chips,1.69,SPICY|SAVORY|SALTY|SOUR,BRAVE|COSMOPOLITAN|SASSY,assets/spicy_dill_pickle_chips.png,"With chips like this, idk how she's single!"
Snyders Mini Pretzles,1.69,SALTY,DESPERATE|HEALTHY,assets/mini_pretzels.png,As affordable as they are bland. Self-burn! Those are rare.`;

// State Controller
let userBudget = 10.00;
let selectedSnacks = new Map(); // Key: snackId, Value: selected quantity count
let activeFilters = new Set();
let filterLogic = 'OR'; // Tracks active boolean mode: 'OR' or 'AND'
let currentMode = 'taste'; // 'taste' or 'vibe'
const taxRate = 0.0379;
let lastSelectedId = null; // Tracks the ID of the most recently interacted snack
let mouseX = 0, mouseY = 0; // Globally stores current cursor coordinates
let currentArmAngle = null; // Tracks the current leg angle


// Pagination configuration
let currentPage = 0;
const itemsPerPage = 24; // Expanded to 24 (6 rows of 4 items each)

// Typewriter & Dialogue Timers
let typeWriterInterval = null;
let speakTimeout = null;

// CSV Parser assigns programmatically generated row letters and column numbers
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    // Remove the UTF-8 BOM if present, and normalize all headers to lowercase
    const headers = lines[0].replace(/^\ufeff/, '').split(',').map(h => h.trim().toLowerCase());

    const parsedList = lines.slice(1).map((line) => {
        const values = [];
        let current = '';
        let inQuotes = false;

        // Process line character-by-character to respect quote boundaries
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes; // Toggle quote state
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        const snack = {};

        headers.forEach((header, indexHeader) => {
            const key = header;
            let val = values[indexHeader] ? values[indexHeader].trim() : '';

            // Strip enclosing double quotes if present
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }

            // TRANSLATE WRITTEN \\n INTO ACTUAL NEWLINES
            val = val.replace(/\\n/g, '\n');

            // Standardize backslashes into web-safe forward slashes for image paths
            val = val.replace(/\\/g, '/');

            if (key === 'categories' || key === 'vibes') {
                snack[key] = val.split('|').map(item => item.trim()).filter(item => item !== '');
            } else {
                snack[key] = val;
            }
        });
        return snack;
    });

    // CRITICAL UPDATE: Filter out any items under construction
    const completeSnacks = parsedList.filter(snack => {
        // Must have a valid name
        if (!snack.name || snack.name.trim() === '') return false;

        // Must have a valid price
        const parsedPrice = parseFloat(snack.price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) return false;

        // Must have categories, vibes, an image path, and a description text
        if (!snack.categories || snack.categories.length === 0 || snack.categories.every(c => c === '')) return false;
        if (!snack.vibes || snack.vibes.length === 0 || snack.vibes.every(v => v === '')) return false;
        if (!snack.image || snack.image.trim() === '') return false;
        if (!snack.description || snack.description.trim() === '') return false;

        return true;
    });

    // Auto-assign ID programmatically (4 items per grid row) ONLY to fully filled-out items
    completeSnacks.forEach((snack, index) => {
        const rowLetter = String.fromCharCode(65 + Math.floor(index / 4));
        const colNum = (index % 4) + 1;
        snack.id = `${rowLetter}${colNum}`;
    });

    return completeSnacks;
}

document.addEventListener('DOMContentLoaded', async () => {
    let snacks = [];

    // CRITICAL UPDATE: Asynchronously fetch live data, fallback to code array if blocked
    try {
        const response = await fetch('WellSky Snack Inventory.csv');
        if (!response.ok) throw new Error("Could not find the external CSV file.");
        const csvText = await response.text();
        snacks = parseCSV(csvText);
        console.log("System: Successfully loaded snacks directly from your WellSky Snack Inventory.csv!");
    } catch (e) {
        console.warn("System: Loading from external CSV failed. Falling back to embedded array data.", e);
        snacks = parseCSV(rawCSVData);
    }

    const grid = document.getElementById('snacks-grid');
    const machine = document.getElementById('vending-machine');
    const popover = document.getElementById('global-popover');
    const mascotDialogue = document.getElementById('mascot-dialogue');
    const mascotAvatarImg = document.getElementById('mascot-avatar-img');
    const flavorFiltersContainer = document.getElementById('flavor-filters');
    const activeProfileTitle = document.getElementById('active-profile-title');

    // Budget UI Selectors
    const budget10Btn = document.getElementById('budget-10');
    const customBudgetInput = document.getElementById('custom-budget-input');
    const budgetCustomApplyBtn = document.getElementById('budget-custom-apply');

    // Pagination Selectors
    const pagePrevBtn = document.getElementById('page-prev');
    const pageNextBtn = document.getElementById('page-next');
    const pageIndicator = document.getElementById('page-indicator');

    // Action Controls
    const automaxxBtn = document.getElementById('automaxx-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Dynamically extract unique tags
    const allCategories = sortedUniqueTags(snacks, 'categories');
    const allVibes = sortedUniqueTags(snacks, 'vibes');

    function sortedUniqueTags(snacksList, key) {
        const tags = new Set();
        snacksList.forEach(snack => {
            if (snack[key]) {
                snack[key].forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }

    // --- INITIALIZE TOTAL PANEL PARTICLE EMITTER ---
    const screenTotal = document.querySelector('.screen-total');
    if (screenTotal) {
        screenTotal.style.position = 'relative';
        const totalSparkles = document.createElement('div');
        totalSparkles.className = 'sparkles-container total-sparkles';
        totalSparkles.innerHTML = `
            <span class="sparkle s1"></span>
            <span class="sparkle s2"></span>
            <span class="sparkle s3"></span>
            <span class="sparkle s4"></span>
            <span class="sparkle s5"></span>
            <span class="sparkle s6"></span>
            <span class="sparkle s7"></span>
            <span class="sparkle s8"></span>
        `;
        screenTotal.appendChild(totalSparkles);
    }

    // --- UPGRADED ANIMATED TYPEWRITER COMPONENT ---
    function speak(text) {
        const container = mascotDialogue.parentElement; 

        if (speakTimeout) clearTimeout(speakTimeout);

        container.classList.remove('speaking', 'hidden');
        void container.offsetWidth; 
        container.classList.add('speaking');

        if (typeWriterInterval) clearInterval(typeWriterInterval);

        mascotDialogue.innerHTML = ''; 

        const tokens = [];
        const parts = text.split(/(\*[^*]+?\*|~[^~]+?~)/g);
        parts.forEach(part => {
            if (!part) return;
            if (part.startsWith('*') && part.endsWith('*')) {
                tokens.push({ text: part.slice(1, -1), type: 'vibrate' });
            } else if (part.startsWith('~') && part.endsWith('~')) {
                tokens.push({ text: part.slice(1, -1), type: 'rainbow' });
            } else {
                tokens.push({ text: part, type: 'normal' });
            }
        });

        let tokenIndex = 0;
        let charIndex = 0;
        let currentSpan = null;

        typeWriterInterval = setInterval(() => {
            if (tokenIndex < tokens.length) {
                const currentToken = tokens[tokenIndex];
                if (charIndex < currentToken.text.length) {
                    const char = currentToken.text.charAt(charIndex);

                    if (char === '\n') {
                        mascotDialogue.appendChild(document.createElement('br'));
                        currentSpan = null;
                    }
                    else if (currentToken.type === 'rainbow') {
                        if (char === ' ') {
                            mascotDialogue.appendChild(document.createTextNode(' '));
                        } else {
                            const charSpan = document.createElement('span');
                            charSpan.className = 'rainbow-wave-char';
                            charSpan.textContent = char;
                            charSpan.style.animationDelay = `-${charIndex * 0.08}s`;
                            mascotDialogue.appendChild(charSpan);
                        }
                    }
                    else if (currentToken.type === 'vibrate') {
                        if (charIndex === 0 || !currentSpan) {
                            currentSpan = document.createElement('span');
                            currentSpan.className = 'italic-vibrate';
                            mascotDialogue.appendChild(currentSpan);
                        }
                        currentSpan.textContent += char;
                    }
                    else {
                        mascotDialogue.appendChild(document.createTextNode(char));
                    }

                    if (mascotAvatarImg) {
                        let elapsedChars = charIndex;
                        for (let t = 0; t < tokenIndex; t++) {
                            elapsedChars += tokens[t].text.length;
                        }
                        const isMouthOpen = Math.floor(elapsedChars / 6) % 2 === 0;
                        mascotAvatarImg.src = isMouthOpen ? 'assets/pretz/pretz_body.png' : 'assets/pretz/pretz_body_speak.png';
                    }

                    charIndex++;
                } else {
                    tokenIndex++;
                    charIndex = 0;
                    currentSpan = null;
                }
            } else {
                clearInterval(typeWriterInterval);
                if (mascotAvatarImg) {
                    mascotAvatarImg.src = 'assets/pretz/pretz_body.png';
                }
                speakTimeout = setTimeout(() => {
                    container.classList.remove('speaking');
                    container.classList.add('hidden');
                }, 2800);
            }
        }, 15);
    }

    function resetCart() {
        selectedSnacks.clear();
        lastSelectedId = null; 
        document.querySelectorAll('.snack-slot').forEach(slot => {
            slot.classList.remove('selected', 'maxx-success');
            const badge = slot.querySelector('.snack-count');
            if (badge) badge.style.display = 'none';
        });
        updateReceipt();
        updateBudgetHighlights(snacks);
    }

    function applyNewBudget(amount) {
        const currentTotal = calculateTotal();
        const currentTotalCents = Math.round(currentTotal * 100);
        const newBudgetCents = Math.round(amount * 100);

        if (currentTotalCents > newBudgetCents) {
            speak(`"Hey! You can't shrink the budget below your current tab! *Dumping your cart.*"`);
            resetCart();
        } else {
            speak(`"$${amount.toFixed(2)} loaded. Let's see what you waste it on."`);
        }
        userBudget = amount;
        updateReceipt();
        updateBudgetHighlights(snacks);
    }

    budget10Btn.addEventListener('click', () => {
        budget10Btn.classList.add('active');
        customBudgetInput.value = '';
        applyNewBudget(10.00);
    });

    budgetCustomApplyBtn.addEventListener('click', () => {
        const customValue = parseFloat(customBudgetInput.value);
        if (isNaN(customValue) || customValue <= 0) {
            speak(`"Nice try. Put in a *real* positive dollar amount!"`);
            return;
        }
        budget10Btn.classList.remove('active');
        applyNewBudget(customValue);
    });

    customBudgetInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') budgetCustomApplyBtn.click();
    });

    // Build snacks UI grid
    snacks.forEach(snack => {
        const slot = document.createElement('div');
        slot.className = 'snack-slot';
        slot.setAttribute('data-id', snack.id);
        slot.setAttribute('data-name', snack.name);
        slot.setAttribute('data-price', snack.price);

        slot.innerHTML = `
            <span class="snack-code">${snack.id}</span>
            <span class="snack-count" id="badge-${snack.id}">0x</span>
            <span class="snack-maxx-badge">MAXX</span>
            
            <div class="sparkles-container">
                <span class="sparkle s1"></span>
                <span class="sparkle s2"></span>
                <span class="sparkle s3"></span>
                <span class="sparkle s4"></span>
                <span class="sparkle s5"></span>
                <span class="sparkle s6"></span>
                <span class="sparkle s7"></span>
                <span class="sparkle s8"></span>
            </div>
            
            <img class="snack-image" src="${snack.image}" alt="${snack.name}">
            
            <div class="slot-ctrl-btn ctrl-minus">−</div>
            <div class="slot-ctrl-btn ctrl-plus">+</div>
        `;

        const minusCtrl = slot.querySelector('.ctrl-minus');
        const plusCtrl = slot.querySelector('.ctrl-plus');

        function incrementQuantity() {
            let hypotheticalSubtotal = 0;
            selectedSnacks.forEach((count, id) => {
                const s = snacks.find(item => item.id === id);
                if (s) {
                    hypotheticalSubtotal += parseFloat(s.price) * count;
                }
            });
            hypotheticalSubtotal += parseFloat(snack.price);

            const hypotheticalTax = hypotheticalSubtotal * taxRate;
            const hypotheticalTotal = hypotheticalSubtotal + hypotheticalTax;

            const hypotheticalTotalCents = Math.round(hypotheticalTotal * 100);
            const budgetCents = Math.round(userBudget * 100);

            if (hypotheticalTotalCents <= budgetCents) {
                const currentCount = selectedSnacks.get(snack.id) || 0;
                selectedSnacks.set(snack.id, currentCount + 1);

                slot.classList.add('selected');
                const badge = slot.querySelector('.snack-count');
                badge.textContent = `${currentCount + 1}x`;
                badge.style.display = 'block';

                lastSelectedId = snack.id; 

                if (hypotheticalTotalCents === budgetCents) {
                    speak(`"*SWEET AUNTIE ANNE!!* You used every last penny like a SnackMaxxer ~LEGEND~!"`);
                } else {
                    speak(`"${snack.description}"`);
                }
            } else {
                speak(`"Hey! You can't afford that ${snack.name}. *Check your pockets!*"`);
                document.querySelector('.display-screen').style.animation = 'gentle-shake 0.2s 2';
                setTimeout(() => document.querySelector('.display-screen').style.animation = '', 400);
            }

            updateReceipt();
            updateBudgetHighlights(snacks);
        }

        slot.addEventListener('click', () => {
            if (!selectedSnacks.has(snack.id) || selectedSnacks.get(snack.id) === 0) {
                incrementQuantity();
            }
        });

        minusCtrl.addEventListener('click', (e) => {
            e.stopPropagation();
            decrementQuantity();
        });

        plusCtrl.addEventListener('click', (e) => {
            e.stopPropagation();
            incrementQuantity();
        });

        function decrementQuantity() {
            if (!selectedSnacks.has(snack.id)) return;
            const currentCount = selectedSnacks.get(snack.id);
            const badge = slot.querySelector('.snack-count');

            if (currentCount <= 1) {
                selectedSnacks.delete(snack.id);
                slot.classList.remove('selected', 'maxx-success');
                badge.style.display = 'none';
                if (selectedSnacks.size > 0) {
                    lastSelectedId = Array.from(selectedSnacks.keys()).pop();
                } else {
                    lastSelectedId = null;
                }
                speak(`"Removed ${snack.name} from your cart."`);
            } else {
                selectedSnacks.set(snack.id, currentCount - 1);
                badge.textContent = `${currentCount - 1}x`;
                speak(`"Subtracted one ${snack.name}."`);
            }

            updateReceipt();
            updateBudgetHighlights(snacks);
        }

        slot.addEventListener('mouseenter', (e) => {
            const priceVal = parseFloat(snack.price);
            const taxVal = priceVal * taxRate;
            const totalVal = priceVal + taxVal;

            const tagsLabel = currentMode === 'taste'
                ? `Flavors: ${snack.categories.join(' / ')}`
                : `Vibes: ${snack.vibes.join(' / ')}`;

            popover.innerHTML = `
                <div class="popover-name">${snack.name}</div>
                <div class="popover-row"><span>Pre-Tax:</span> <span>$${priceVal.toFixed(2)}</span></div>
                <div class="popover-row"><span>With Tax:</span> <span>$${totalVal.toFixed(2)}</span></div>
                <div class="popover-tags">${tagsLabel}</div>
            `;

            popover.style.display = 'block';
            positionPopover(e.currentTarget, machine, popover);
        });

        slot.addEventListener('mouseleave', () => {
            popover.style.display = 'none';
        });

        grid.appendChild(slot);
    });

    function getMatchingSnacks() {
        return snacks.filter(snack => {
            const tagsToCheck = currentMode === 'taste' ? snack.categories : snack.vibes;
            if (activeFilters.size === 0) {
                return true;
            } else {
                if (filterLogic === 'OR') {
                    return tagsToCheck.some(tag => activeFilters.has(tag));
                } else {
                    return Array.from(activeFilters).every(tag => tagsToCheck.includes(tag));
                }
            }
        });
    }

    function changePage(direction) {
        const matchingSnacks = getMatchingSnacks();
        const totalPages = Math.max(1, Math.ceil(matchingSnacks.length / itemsPerPage));

        if (totalPages <= 1) return;

        const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        grid.classList.add(slideOutClass);

        setTimeout(() => {
            if (direction === 'next') {
                currentPage = (currentPage + 1) % totalPages;
            } else {
                currentPage = (currentPage - 1 + totalPages) % totalPages;
            }

            applyFilters();

            grid.classList.remove(slideOutClass);
            const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            grid.classList.add(slideInClass, 'momentum-shake');

            setTimeout(() => {
                grid.classList.remove(slideInClass, 'momentum-shake');
            }, 350);
        }, 200);
    }

    function updateArrowGlows() {
        const matchingSnacks = getMatchingSnacks();
        const totalPages = Math.max(1, Math.ceil(matchingSnacks.length / itemsPerPage));
        if (!pagePrevBtn || !pageNextBtn) return;

        pagePrevBtn.disabled = (currentPage === 0);
        pageNextBtn.disabled = (currentPage === totalPages - 1);

        pagePrevBtn.classList.remove('glow-gold', 'glow-green');
        pageNextBtn.classList.remove('glow-gold', 'glow-green');

        const currentTotal = calculateTotal();
        const budgetLeft = userBudget - currentTotal;
        const budgetLeftCents = Math.round(budgetLeft * 100);

        function getPagesState(startPage, endPage) {
            let hasMaxx = false;
            let hasAffordable = false;

            for (let p = startPage; p <= endPage; p++) {
                const startIdx = p * itemsPerPage;
                const endIdx = Math.min(startIdx + itemsPerPage, matchingSnacks.length);

                for (let i = startIdx; i < endIdx; i++) {
                    const snack = matchingSnacks[i];

                    if (selectedSnacks.has(snack.id) && selectedSnacks.get(snack.id) > 0) continue;

                    let hypotheticalSubtotal = 0;
                    selectedSnacks.forEach((count, id) => {
                        const s = snacks.find(item => item.id === id);
                        if (s) hypotheticalSubtotal += parseFloat(s.price) * count;
                    });
                    hypotheticalSubtotal += parseFloat(snack.price);

                    const hypotheticalTax = hypotheticalSubtotal * taxRate;
                    const hypotheticalTotal = hypotheticalSubtotal + hypotheticalTax;
                    const hypotheticalTotalCents = Math.round(hypotheticalTotal * 100);
                    const budgetCents = Math.round(userBudget * 100);

                    if (budgetLeftCents > 0 && hypotheticalTotalCents === budgetCents) {
                        hasMaxx = true;
                    } else if (hypotheticalTotalCents <= budgetCents) {
                        hasAffordable = true;
                    }
                }
            }
            return { hasMaxx, hasAffordable };
        }

        if (currentPage > 0) {
            const state = getPagesState(0, currentPage - 1);
            if (state.hasMaxx) pagePrevBtn.classList.add('glow-gold');
            else if (state.hasAffordable) pagePrevBtn.classList.add('glow-green');
        }

        if (currentPage < totalPages - 1) {
            const state = getPagesState(currentPage + 1, totalPages - 1);
            if (state.hasMaxx) pageNextBtn.classList.add('glow-gold');
            else if (state.hasAffordable) pageNextBtn.classList.add('glow-green');
        }
    }

    if (pagePrevBtn && pageNextBtn) {
        pagePrevBtn.addEventListener('click', () => changePage('prev'));
        pageNextBtn.addEventListener('click', () => changePage('next'));
    }

    function positionPopover(targetSlot, machineContainer, popoverEl) {
        const slotRect = targetSlot.getBoundingClientRect();
        const machineRect = machineContainer.getBoundingClientRect();

        const relativeLeft = slotRect.left - machineRect.left;
        const relativeTop = slotRect.top - machineRect.top;

        let targetX = relativeLeft + (slotRect.width / 2) - (popoverEl.offsetWidth / 2);
        let targetY = relativeTop - popoverEl.offsetHeight - 8;

        if (targetX < 10) targetX = 10;
        if (targetX + popoverEl.offsetWidth > machineRect.width - 10) {
            targetX = machineRect.width - popoverEl.offsetWidth - 10;
        }
        if (targetY < 10) {
            targetY = relativeTop + slotRect.height + 8;
        }

        popoverEl.style.left = `${targetX}px`;
        popoverEl.style.top = `${targetY}px`;
    }

    function calculateTotal() {
        let subtotal = 0;
        selectedSnacks.forEach((count, id) => {
            const slot = document.querySelector(`[data-id="${id}"]`);
            if (slot) {
                const basePrice = parseFloat(slot.getAttribute('data-price'));
                subtotal += (basePrice * count);
            }
        });
        const tax = subtotal * taxRate;
        return subtotal + tax;
    }

    function updateReceipt() {
        const ledger = document.getElementById('receipt-ledger');
        ledger.innerHTML = ''; 

        let subtotal = 0;

        if (selectedSnacks.size === 0) {
            ledger.innerHTML = '<div class="empty-cart-msg">--- INSERT COIN ---</div>';
        } else {
            selectedSnacks.forEach((count, id) => {
                if (count <= 0) return;
                const slot = document.querySelector(`[data-id="${id}"]`);
                if (slot) {
                    const price = parseFloat(slot.getAttribute('data-price'));
                    const name = slot.getAttribute('data-name');
                    const itemTotal = price * count;
                    subtotal += itemTotal;

                    const ledgerRow = document.createElement('div');
                    ledgerRow.className = 'ledger-item';
                    ledgerRow.innerHTML = `<span>[${id}] ${name} x${count}</span> <span>$${itemTotal.toFixed(2)}</span>`;
                    ledger.appendChild(ledgerRow);
                }
            });

            ledger.scrollTop = ledger.scrollHeight;
        }

        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        const remainingBudget = userBudget - total;

        document.getElementById('subtotal-val').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax-val').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total-val').textContent = `$${total.toFixed(2)}`;
        document.getElementById('budget-value').textContent = `$${remainingBudget.toFixed(2)}`;
    }

    function updateBudgetHighlights(snacksList) {
        const currentTotal = calculateTotal();
        const budgetLeft = userBudget - currentTotal;
        const budgetLeftCents = Math.round(budgetLeft * 100);

        const isCurrentlyMaxxed = (budgetLeftCents === 0 && selectedSnacks.size > 0);

        if (screenTotal) {
            if (isCurrentlyMaxxed) {
                screenTotal.classList.add('maxx-success');
            } else {
                screenTotal.classList.remove('maxx-success');
            }
        }

        snacksList.forEach(snack => {
            const slot = document.querySelector(`[data-id="${snack.id}"]`);
            if (!slot) return;

            let hypotheticalSubtotal = 0;
            selectedSnacks.forEach((count, id) => {
                const s = snacks.find(item => item.id === id);
                if (s) {
                    hypotheticalSubtotal += parseFloat(s.price) * count;
                }
            });
            hypotheticalSubtotal += parseFloat(snack.price);

            const hypotheticalTax = hypotheticalSubtotal * taxRate;
            const hypotheticalTotal = hypotheticalSubtotal + hypotheticalTax;
            const hypotheticalTotalCents = Math.round(hypotheticalTotal * 100);
            const budgetCents = Math.round(userBudget * 100);

            const isAlreadySelected = selectedSnacks.has(snack.id) && selectedSnacks.get(snack.id) > 0;

            slot.classList.remove('affordable', 'expensive', 'maxx', 'maxx-success');

            if (isCurrentlyMaxxed) {
                if (isAlreadySelected) {
                    slot.classList.add('maxx-success');
                }
                return;
            }

            if (budgetLeftCents > 0 && hypotheticalTotalCents === budgetCents) {
                slot.classList.add('maxx');
                return; 
            }

            if (isAlreadySelected) {
                return;
            }

            if (hypotheticalTotalCents <= budgetCents) {
                slot.classList.add('affordable');
            } else {
                slot.classList.add('expensive');
            }
        });

        updateArrowGlows();
    }

    function renderFilters() {
        flavorFiltersContainer.innerHTML = '';
        const tags = currentMode === 'taste' ? allCategories : allVibes;

        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'flavor-btn';
            if (activeFilters.has(tag)) {
                btn.classList.add('active');
            }
            btn.textContent = tag;

            btn.addEventListener('click', () => {
                if (activeFilters.has(tag)) {
                    activeFilters.delete(tag);
                    btn.classList.remove('active');
                } else {
                    activeFilters.add(tag);
                    btn.classList.add('active');
                }
                currentPage = 0; 
                applyFilters();
            });

            flavorFiltersContainer.appendChild(btn);
        });
    }

    const modeTasteBtn = document.getElementById('mode-taste');
    const modeVibeBtn = document.getElementById('mode-vibe');

    modeTasteBtn.addEventListener('click', () => {
        if (currentMode === 'taste') return;
        currentMode = 'taste';
        modeTasteBtn.classList.add('active');
        modeVibeBtn.classList.remove('active');
        activeProfileTitle.textContent = 'Active Taste Filters';
        activeFilters.clear();
        currentPage = 0; 
        renderFilters();
        applyFilters();
    });

    modeVibeBtn.addEventListener('click', () => {
        if (currentMode === 'vibe') return;
        currentMode = 'vibe';
        modeVibeBtn.classList.add('active');
        modeTasteBtn.classList.remove('active');
        activeProfileTitle.textContent = 'Active Vibe Filters';
        activeFilters.clear();
        currentPage = 0; 
        renderFilters();
        applyFilters();
    });

    const btnOr = document.getElementById('btn-or');
    const btnAnd = document.getElementById('btn-and');

    btnOr.addEventListener('click', () => {
        filterLogic = 'OR';
        btnOr.classList.add('active');
        btnAnd.classList.remove('active');
        currentPage = 0; 
        applyFilters();
    });

    function applyFilters() {
        const matchingSnacks = getMatchingSnacks();
        const totalPages = Math.max(1, Math.ceil(matchingSnacks.length / itemsPerPage));

        if (currentPage >= totalPages) {
            currentPage = 0;
        }

        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const pageSnacks = matchingSnacks.slice(start, end);

        const slots = document.querySelectorAll('.snack-slot');
        slots.forEach(slot => {
            const id = slot.getAttribute('data-id');
            const isPageSnack = pageSnacks.some(s => s.id === id);

            slot.style.display = isPageSnack ? 'flex' : 'none';
        });

        if (pageIndicator) {
            pageIndicator.textContent = `PAGE ${currentPage + 1}/${totalPages}`;
        }

        updateArrowGlows();
    }

    btnAnd.addEventListener('click', () => {
        filterLogic = 'AND';
        btnAnd.classList.add('active');
        btnOr.classList.remove('active');
        currentPage = 0; 
        applyFilters();
    });

    function findMaxxCombinationsSafe(matchingSnacksList, currentSubtotal, targetBudget, taxRateVal, maxSteps = 20000, maxResults = 1000) {
        const targetCents = Math.round(targetBudget * 100);
        const currentSubtotalCents = Math.round(currentSubtotal * 100);
        const itemPricesCents = matchingSnacksList.map(s => Math.round(parseFloat(s.price) * 100));

        const results = [];
        let steps = 0;

        function search(idx, currentAddedCents, currentPath) {
            steps++;
            if (steps > maxSteps || results.length >= maxResults) {
                return;
            }

            const subtotalCents = currentSubtotalCents + currentAddedCents;
            const totalCents = Math.round(subtotalCents * (1 + taxRateVal));

            if (totalCents === targetCents) {
                results.push([...currentPath]);
                return;
            }

            if (totalCents > targetCents) {
                return;
            }

            for (let i = idx; i < matchingSnacksList.length; i++) {
                const priceCents = itemPricesCents[i];
                const newSubtotal = subtotalCents + priceCents;
                const newTotalCents = Math.round(newSubtotal * (1 + taxRateVal));
                if (newTotalCents <= targetCents) {
                    currentPath.push(matchingSnacksList[i].id);
                    search(i, currentAddedCents + priceCents, currentPath);
                    currentPath.pop();
                }
            }
        }

        search(0, 0, []);
        return results;
    }

    if (automaxxBtn) {
        automaxxBtn.addEventListener('click', () => {
            const currentTotal = calculateTotal();
            const currentTotalCents = Math.round(currentTotal * 100);
            const targetCents = Math.round(userBudget * 100);

            if (currentTotalCents === targetCents) {
                speak('"Your cart is already perfectly ~SnackMaxxed!~"');
                return;
            }

            const activeMatchingSnacks = getMatchingSnacks();
            if (activeMatchingSnacks.length === 0) {
                speak('"No SnackMaxxing combos exist for the current selection!"');
                return;
            }

            let currentSubtotal = 0;
            selectedSnacks.forEach((count, id) => {
                const s = snacks.find(item => item.id === id);
                if (s) {
                    currentSubtotal += parseFloat(s.price) * count;
                }
            });

            const combos = findMaxxCombinationsSafe(activeMatchingSnacks, currentSubtotal, userBudget, taxRate);

            if (combos.length > 0) {
                const randomCombo = combos[Math.floor(Math.random() * combos.length)];

                randomCombo.forEach(id => {
                    selectedSnacks.set(id, (selectedSnacks.get(id) || 0) + 1);
                });

                document.querySelectorAll('.snack-slot').forEach(slot => {
                    const id = slot.getAttribute('data-id');
                    const badge = slot.querySelector('.snack-count');
                    if (selectedSnacks.has(id)) {
                        slot.classList.add('selected');
                        if (badge) {
                            badge.textContent = `${selectedSnacks.get(id)}x`;
                            badge.style.display = 'block';
                        }
                    }
                });

                updateReceipt();
                updateBudgetHighlights(snacks);  
                speak('"*SWEET AUNTIE ANNE!!* You used every last pen- OH RIGHT... *I* did that for you."');
            } else {
                speak('"No SnackMaxxing combos exist for the current selection!"');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            resetCart();
            speak('"Cart wiped clean! Ready for a fresh SnackMaxx session."');
        });
    }

    // --- MASCOT CENTRALIZED VECTOR PHYSICS ENGINE ---
    const armL = document.getElementById('mascot-arm-l');
    const armR = document.getElementById('mascot-arm-r');
    const legL = document.getElementById('mascot-leg-l');
    const legR = document.getElementById('mascot-leg-r');
    const pupilL = document.getElementById('pupil-l');
    const pupilR = document.getElementById('pupil-r');

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateMascotAnimations() {
        const timeSec = Date.now() / 1000;

        const armSwaySpeed = 2.2;  
        const legSwaySpeed = 2.5;  

        const armSwayStrength = 10; 
        const legSwayStrength = 6.0;  

        const leftArmIdleSway = Math.sin(timeSec * (2 * Math.PI / armSwaySpeed)) * armSwayStrength;
        const leftLegIdleSway = Math.sin(timeSec * (2 * Math.PI / legSwaySpeed)) * legSwayStrength;

        const rightArmIdleSway = -Math.sin(timeSec * (2 * Math.PI / armSwaySpeed)) * armSwayStrength;
        const rightLegIdleSway = -Math.sin(timeSec * (2 * Math.PI / legSwaySpeed)) * legSwayStrength;

        if (armR) {
            armR.style.transform = `rotate(${rightArmIdleSway}deg)`;
        }
        if (legL) {
            legL.style.transform = `rotate(${leftLegIdleSway}deg)`;
        }
        if (legR) {
            legR.style.transform = `rotate(${rightLegIdleSway}deg)`;
        }

        [pupilL, pupilR].forEach(pupil => {
            if (!pupil) return;
            const socketRect = pupil.parentElement.getBoundingClientRect();
            const centerX = socketRect.left + socketRect.width / 2;
            const centerY = socketRect.top + socketRect.height / 2;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const maxMovement = 3; 
            if (dist > 0) {
                const angle = Math.atan2(dy, dx);
                const clampDist = Math.min(dist * 0.1, maxMovement); 
                const moveX = Math.cos(angle) * clampDist;
                const moveY = Math.sin(angle) * clampDist;
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        if (armL) {
            const targetSlot = lastSelectedId ? document.querySelector(`[data-id="${lastSelectedId}"]`) : null;

            if (targetSlot && targetSlot.style.display !== 'none') {
                armL.classList.add('pointing');
                armL.src = 'assets/pretz/pretz_arm_left_point.png';

                const armRect = armL.getBoundingClientRect();
                const slotRect = targetSlot.getBoundingClientRect();

                const pivotX = armRect.left + armRect.width * 0.50;
                const pivotY = armRect.top + armRect.height * 0.10;

                const targetX = slotRect.left + slotRect.width / 2;
                const targetY = slotRect.top + slotRect.height / 2;

                const dx = targetX - pivotX;
                const dy = targetY - pivotY;

                const angleRad = Math.atan2(dy, dx);
                let angleDeg = angleRad * (180 / Math.PI);

                const angleOffset = -100;
                const targetAngle = angleDeg + angleOffset;

                if (currentArmAngle === null) {
                    currentArmAngle = leftArmIdleSway;
                }

                let diff = targetAngle - currentArmAngle;
                diff = ((diff + 540) % 360) - 180; 
                currentArmAngle += diff * 0.12;

                armL.style.transform = `rotate(${currentArmAngle}deg)`;
            } else {
                armL.src = 'assets/pretz/pretz_arm_left.png';

                if (currentArmAngle !== null) {
                    let diff = leftArmIdleSway - currentArmAngle;
                    diff = ((diff + 540) % 360) - 180;

                    if (Math.abs(diff) < 1.0) {
                        armL.classList.remove('pointing');
                        currentArmAngle = null; 
                        armL.style.transform = `rotate(${leftArmIdleSway}deg)`;
                    } else {
                        currentArmAngle += diff * 0.12;
                        armL.style.transform = `rotate(${currentArmAngle}deg)`;
                    }
                } else {
                    armL.classList.remove('pointing');
                    armL.style.transform = `rotate(${leftArmIdleSway}deg)`;
                }
            }
        }

        requestAnimationFrame(updateMascotAnimations);
    }

    requestAnimationFrame(updateMascotAnimations);

    renderFilters();
    applyFilters();
    updateBudgetHighlights(snacks);

    speak("Hi, i'm *PRETZ*-ton! Let's get to Snack ~MAXXING~!");
});
