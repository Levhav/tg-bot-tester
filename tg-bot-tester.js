

loadJs = async function(){

    let def = new $.Deferred()
    if(window.jQuery)
    {
        def.resolve();
    }
    else
    {
        var link = document.createElement("script");
        link.setAttribute("type", "text/javascript");
        link.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        link.onload = function(){
            def.resolve();
        }
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    return def.promise();
}

wait = async function(delay = 1500, func = undefined)
{
    let def = new $.Deferred()

    setTimeout(()=>{
        if(func) func()
        def.resolve();
    }, delay)

    return def.promise();
}

sendMessage = async function(text, time = 1500)
{
    console.log("[BotTest] sendMessage:", text)
    $(".composer_rich_textarea").html(text)

    setTimeout(()=>{
        $(".im_submit_send .im_submit_send_label").trigger('touchstart')
    }, 300)

    await wait(time+300)

}

function getInHistory(selector = undefined)
{
    let im_history_messages_peer = $("body .page_wrap .im_page_split .im_history_loaded .im_history_selected_wrap .im_history_wrap .im_history_messages .im_history_messages_peer")

    for(let i = 0; i< im_history_messages_peer.length; i++)
    {
        if(!$(im_history_messages_peer[i]).hasClass('ng-hide'))
        {
            if(selector === undefined)
            {
                return  $(im_history_messages_peer[i])
            }

            return $(im_history_messages_peer[i]).find(selector)
        }
    }

    debugger;
    return undefined
}

function getLastMessageText()
{
    return getInHistory(".im_history_message_wrap:last .im_message_body .im_message_text").html()
}

async function lastMessageTextHas(text)
{
    let errors = 0;
    do
    {
        if(getLastMessageText() == text && errors < 5)
        {
            assertOk(getLastMessageText() == text)
        }
        errors++
        await wait();

    }while (errors < 5)

    assertOk(getLastMessageText().indexOf(text) !== -1)
    await wait();
}

async function testLastMessageText(text)
{
    let errors = 0;
    do
    {
        if(getLastMessageText() == text && errors < 5)
        {
            assertOk(getLastMessageText() == text)
        }
        errors++
        await wait();

    }while (errors < 5)

    assertOk(getLastMessageText().indexOf(text) == 0)
    await wait();
}

function assertOk(value, title = false)
{
    if(title)
    {
        title = "Not found:"+value
    }

    if(!value)
    {
        console.error("[BotTest]",title, "value = ",value)
        debugger;
        throw ""+title + ", value = "+value
    }
    console.info("[BotTest]",title, "value = ",value)
}

function getInlineBtnByName(title)
{
    let btnArr = getInHistory(".im_message_body:last .btn.reply_markup_button")
    for(let i = 0; i < btnArr.length; i++)
    {
        if($(btnArr[i]).html().indexOf(title) != -1)
        {
            return $(btnArr[i])
        }
    }

    return false
}

btnClickByName = async function(Name, time = 1700)
{
    console.log("[BotTest]btnClickByName:", "Name = "+Name)
    let btnEn = false;
    let errcont = 0;
    do{

        btnEn = getInlineBtnByName(Name)
        if(btnEn === false)
        {
            await wait()
        }
        errcont++;
    }while (btnEn === false && errcont < 5)

    assertOk(btnEn, "Btn '"+Name+"' not found")
    btnEn.css({'background-color': '#ffc8c8'});

    setTimeout(() =>{
        btnEn.trigger('click')
    }, 300)

    await wait(time+300)
    return
}

await loadJs();

// Example
//await wait();
//await sendMessage('Hello, it test message')

