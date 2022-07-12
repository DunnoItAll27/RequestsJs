# RequestsJs

Send HTTP requests easily using JavaScript

### [Demo](https://msfpt.github.io/RequestsJs)

<br>

## import RequestsJs using this script link

```html
<script src="https://msfpt.github.io/RequestsJs/requests.min.js" async></script>
```

## Example

```javascript
const send_request = event => {
  new $request('/app/login', {
    method: 'POST',
    header: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      "username": "msfpt",
      "password": "********"
    },
    success: (response, status) => {
      console.log("Response: " + response);
      console.log("Status: " + status);
    },
    error: error => {
      console.error(error);
    }
  });
}
```