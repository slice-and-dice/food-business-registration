Example registration form output in JSON format, to be sent to the registration processing pipeline (work-in-progress):

```json
{
  "registrationData": {
    "exampleField1": true,
    "exampleField2": false,
    "exampleField3": 10,
    "exampleField4": "Additional comments"
  },
  "localAuthority": {
    "id": "MAV",
    "name": "Malvern Hills District Council"
  },
  "answerIds": ["TYPE-001", "TYPE-003", "001", "004", "006"],
  "registrationSource": "FSA Online Registration Form"
}
```