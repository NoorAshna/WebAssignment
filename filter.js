$(document).ready(function () {
	let activeFilters = []

	function resetFilters() {
		activeFilters = []
		$(".filters").addClass("hidden")
		$("main").css("padding-top", "3rem")
		$(".card").removeClass("hidden")
	}

	function updateDisplayedFilters() {
		if (activeFilters.length < 1) {
			resetFilters()
			return
		}

		// Filter Display
		$(".filters > ul").empty()
		$(".filters > ul").append(
			activeFilters.map((item) => {
				itemString =
					"<li><p>" +
					item +
					'</p><img class="filters__removeButton" data-filterName="' +
					item +
					'" src="./images/icon-remove.svg" alt="remove filter" /></li>'
				return itemString
			})
		)

		// Shuffle content down in main that no longer displays
		$("main").css(
			"padding-top",
			$(".filters").outerHeight() ? $(".filters").outerHeight() : 0
		)

		// Add Hidden Filters to appropriate cards
		let cardList = $(".card")
		for (let cardIndex = 0; cardIndex < cardList.length; cardIndex++) {
			let card = cardList[cardIndex]
			let tags = $(card)
				.children("section")
				.children(".card__filters")
				.children("li")
				.text()
			for (
				let filterIndex = 0;
				filterIndex < activeFilters.length;
				filterIndex++
			) {
				if (!tags.includes(activeFilters[filterIndex])) {
					$(cardList[cardIndex]).addClass("hidden")
					continue
				}
			}
		}
	}

	function filterCards() {}

	$(".filters__clear").click(function (e) {
		e.preventDefault()
		resetFilters()
	})

	$(this).on("click", "img.filters__removeButton", function (e) {
		e.preventDefault()
		activeFilters = activeFilters.filter((item) => {
			return item != $(this)[0].dataset["filtername"]
		})
		updateDisplayedFilters()
	})

	$(".card__filters > li").click(function (e) {
		e.preventDefault()
		$(".filters").removeClass("hidden")

		let newFilter = $(this)[0].childNodes[0].data
		if (!activeFilters.includes(newFilter)) {
			activeFilters.push(newFilter)
		}
		updateDisplayedFilters()
	})
	
	$("#add-new-button").click(function () {
        $("#new-job-form").removeClass("hidden");
    });

    // Handle form submission
    $("#job-form").submit(function (e) {
        e.preventDefault();
        
        // Get the form input values
        const companyName = $("input[name='companyName']").val();
        const logoLink = $("input[name='logoLink']").val();
        const position = $("input[name='position']").val();
		const contract = $("input[name='contract']").val();
		const languages = $("input[name='languages']").val();
		const tools = $("input[name='tools']").val();

		const location = $("input[name='location").val();

        const isNew = $("input[name='isNew']").is(":checked");
        const isFeatured = $("input[name='isFeatured']").is(":checked");

        // Create a new job listing HTML based on the input values
        const newJobListing = `
		<div class="card">
		<img src="./images/eyecam-co.svg" alt="eyecam company logo" />
		<section>
			<div class="row card__title">
				<h2>`+ companyName +`</h2>
				`
				 if(isNew == ture){
					
                    `<h3 class="tag">New!</h3>`
				}
				if(isFeatured == true){
					`<h3 class="tag background-dark">Featured</h3>
					`
				}
				+ `
			</div>
			<h1>` +  position + `</h1>
			<ul class="row card__jobData">
				<li>3w ago</li>
				<li>`+contract+`</li>
				<li>`+location+`</li>
			</ul>
		</section>
		<div class="mobile-divider"></div>
		<section>
			<ul class="card__filters">
				<!-- Role -->
				<li>Fullstack</li>
				<!-- Level -->
				<li>Midweight</li>
				<!-- Languages -->
				<li>JavaScript</li>
				<li>Python</li>
				<!-- Tools -->
				<li>Django</li>
			</ul>
		</section>
		<!-- Item End -->
	</div>
        `;

        // Append the new job listing to the main section
        $("main").append(newJobListing);

        // Reset the form and hide it
        $("#job-form")[0].reset();
        $("#new-job-form").addClass("hidden");
    });
})


