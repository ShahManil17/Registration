function disp(val) {
    document.getElementById('content').innerHTML = `
    <div class="right_content">
                <p style="font-size: 50px;"><b>The Best Managed Cloud<br>Hosting for ${val}</b></p>
            </div>
            <div class="right_content">
                <p style="color: grey; font-size: 25px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatem consequuntur mollitia fuga quis aliquam eaque aperiam? Soluta, obcaecati officiis.</p>
            </div>
            <div class="right_content">
                <div class="tech_ben">
                    <div class="tech_row">
                        <div class="tech_col">
                            <img src="assets/Vector.png" alt="" style="margin: 0 10px;">
                            <p style="color: grey; font-size: 25px;">Unlimited Bandwith</p>
                        </div>
                        <div class="tech_col">
                            <img src="assets/Vector.png" alt="" style="margin: 0 10px;">
                            <p style="color: grey; font-size: 25px;">Unlimited Bandwith</p>
                        </div>
                    </div>
                    <div class="tech_row">
                        <div class="tech_col">
                            <img src="assets/Vector.png" alt="" style="margin: 0 10px;">
                            <p style="color: grey; font-size: 25px;">Unlimited Bandwith</p>
                        </div>
                        <div class="tech_col">
                            <img src="assets/Vector.png" alt="" style="margin: 0 10px;">
                            <p style="color: grey; font-size: 25px;">Unlimited Bandwith</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right_content">
                <button class="more orange" style="margin: 30px 160px;">More Details</button>
            </div>
    `
}

function sc(act) {
    var row = document.getElementsByClassName("cust_container")[0];
    if (act == 'next') {
        row.scrollLeft += 200;
    }
    else {
        row.scrollLeft -= 200;
    }
}