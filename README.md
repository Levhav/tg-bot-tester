# tg-bot-tester

JS Framwork for integration testing telegram bots
 
# Use

- Open a dialogue with the bot
- Press F12 to open the debugger.
- Paste there all the test code and library
- We are waiting for the completion of tests

# Example

```
// Send a message
await sendMessage ('Hello, it test message')

// Check the contents of the bot response
await lastMessageTextHas("Nice to meet you!")

// Press the button with title `EN`
await btnClickByName('EN')

// wait 3 seconds
await wait(3000) 

// Check the contents of the bot response
await lastMessageTextHas("Goodbye")
```

