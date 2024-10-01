
# TODO

- use SWR at fineTables display and use alias as data:FineList
- work on middleware protection : use authMiddleware as well as role middleware create middleware such as const allMiddlewares = composeMiddleware([
  loggingMiddleware,
  applyMiddleware(getFinesHandler, ['Student']), // The auth middleware
  validateInputMiddleware,
  roleMiddleware(['Student']), // Check for the 'Student' role
]); as well as follow the link : https://chatgpt.com/share/66fb21c0-aee0-8013-9848-629326a34966


## tip

- f1 > vs code counter 


principal : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjg4NGM2OTZmMDNkMWZkZWI0OWE1MiIsInJvbGUiOiJIZWFkQWRtaW4iLCJpYXQiOjE3Mjc4MDY3MzUsImV4cCI6MTcyNzg0OTkzNX0.xZpX1zO3Qn9IxdAmqIJEiOPu9wyGM8I96zdvTlBlIck

admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGQ5MDAyYTU0YmIwMjBjOGVkYWQ3MSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyNzgwNjE4NywiZXhwIjoxNzI3ODQ5Mzg3fQ.1e4TQkFZB5xeysBLe0W_60JQzUvFXgzgDlm6xah9XJE

student : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTkyM2FlZDY3MWQ3MWNkMDhmNTMyMiIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzI3ODA1OTQzLCJleHAiOjE3Mjc4NDkxNDN9.BP_AkwRu4fuVS9AXRdNmC1uKrasbU2fYq8GOGOAirk8