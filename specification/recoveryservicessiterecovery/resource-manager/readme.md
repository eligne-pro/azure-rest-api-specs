# RecoveryServicesSiteRecovery
    
> see https://aka.ms/autorest

This is the AutoRest configuration file for RecoveryServicesSiteRecovery.



---
## Getting Started 
To build the SDK for RecoveryServicesSiteRecovery, simply [Install AutoRest](https://aka.ms/autorest/install) and in this folder, run:

> `autorest`

To see additional help and options, run:

> `autorest --help`
---

## Configuration



### Basic Information 
These are the global settings for the RecoveryServicesSiteRecovery API.

``` yaml
openapi-type: arm
tag: package-2016-08
```


### Tag: package-2016-08

These settings apply only when `--tag=package-2016-08` is specified on the command line.

``` yaml $(tag) == 'package-2016-08'
input-file:
- Microsoft.RecoveryServices/2016-08-10/service.json
```


---
## Language-specific settings: CSharp

These settings apply only when `--csharp` is specified on the command line.

``` yaml $(csharp)
csharp:
  # override the default output folder
  output-folder: $(output-folder)/csharp
```

