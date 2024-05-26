
let cached = (global as any).payload

if(!cached){
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
  
}

export const getPayloadClint = async () => {

}