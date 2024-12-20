
const load_all_post = async (category) => {

    // if (category) {
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    // }
    // else {
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    // }


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

load_all_post()