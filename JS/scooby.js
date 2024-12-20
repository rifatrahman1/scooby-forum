
const load_all_post = async (category) => {

    // if (category) {
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    // }
    // else {
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    // }

    const post_container = document.getElementById('post_container').innerHTML = '';

    const response = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    const data = await response.json();
    display_all_post(data.posts)
}

const display_all_post = (posts) => {
    const post_container = document.getElementById('post_container');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
        <!-- card 1 -->
                <div  class="flex spy col-span-2 gap-6 bg-[#F3F3F5] p-10 rounded-3xl">
                    <!-- images -->
                <div class="indicator">
                    <span class="indicator-item badge ${post.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"}"></span>
                    <div class="grid">
                        <img class="h-[72px] w-[72px]" src="${post.image}" alt="">
                    </div>
                </div>
                <!-- description -->
                <div>
                    <div class="flex gap-5 items-center">
                        <p class="font-medium text-[#12132DCC]"># ${post.category}</p>
                        <p class="font-medium text-[#12132DCC]">Author : ${post.author.name}</p>
                    </div>
                    <h3 class="text-xl font-bold mt-3 text-[#12132D]">${post.title}</h3>
                    <p class="text-[#12132D99] text-[16px] mt-4">${post.description}</p>
                    <div class=" border border-dashed mt-5"></div>
                    <div class="flex justify-between mt-6">
                        <div class="flex gap-7">
                            <div class="flex gap-4 items-center">
                                <img src="./icons/comment.png" alt="">
                                <p class="text-[#12132D99]">${post.comment_count}</p>
                            </div>
                            <div class="flex gap-4 items-center">
                                <img src="./icons/eye.png" alt="">
                                <p class="text-[#12132D99]">${post.view_count}</p>
                            </div>
                            <div class="flex gap-4 items-center">
                                <img src="./icons/watch.png" alt="">
                                <p class="text-[#12132D99]">${post.posted_time} min</p>
                            </div>
                        </div>
                        <div class="hover:bg-green-800 rounded-full">
                            <img onclick="mark_as_read('${post.description}', '${post.view_count}')" class="cursor-pointer" src="./icons/email.png" alt="">
                        </div>
                    </div>
                </div>

            </div>
        `
        post_container.appendChild(div);
    });
}

const mark_as_read = (description, view_count) => {
    const mark_as_read_container = document.getElementById('read_as_container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex items-center justify-between gap-2 bg-white p-4 rounded-2xl mt-5">
                                <h3 class="font-semibold text-[#12132D]">${description}</h3>
                                <div class="flex items-center gap-2">
                                    <img src="./icons/eye.png" alt="">
                                    <p>${view_count}</p>
                                </div>
                            </div>
    `
    mark_as_read_container.appendChild(div);

    handle_count();
}

const handle_count = () => {
    const prev_count = document.getElementById ('mark_handle_count').innerText;

    const convert_count = parseInt (prev_count);
    const sum = convert_count + 1;
    document.getElementById ('mark_handle_count').innerText = sum;

}

const handle_search_post = () => {
    const search_post = document.getElementById('search_post').value;
    load_all_post(search_post)
}

const latest_post = async () => {
    const response = await fetch (`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    display_latest_post(data);
}

const display_latest_post = (latest) => {
    const latest_container = document.getElementById ('latest_container');
    
    latest.forEach(data => {
        const div = document.createElement ('div');
    div.innerHTML = `
    <div class="border rounded-3xl p-6">
                        <img class="bg-[#12132D0D] w-[326px] h-[190px] rounded-3xl" src="${data.cover_image}" alt="">
                        <div class="flex items-center gap-4 text-[#12132D99] mt-6">
                            <img src="./icons/calender.png" alt="">
                            <p>${data.author.posted_date}</p>
                        </div>
                        <h2 class="text-[18px] font-extrabold text-[#12132D] mt-4">${data.title}</h2>
                        <p class="text-[#12132D99] mt-3">${data.description}</p>
                        <div class="flex items-center gap-4 mt-4">
                            <img class="w-[44px] h-[44px] bg-cover rounded-full" src="${data.profile_image}" alt="">
                            <div>
                                <p class="text-[#12132D] font-bold">${data.author.name}</p>
                                <p class="text-[14px] text-[#12132D99] mt-1">${data.author.designation}</p>
                            </div>
                        </div>
                    </div>
    `;
    latest_container.appendChild (div);
    });
    
}

latest_post();
load_all_post()