export interface Exec {
    stdout: string
    stderr:string
}

export interface MessageDeploy {
    title:string, 
    commit:string, 
    date:string, 
    message:string,
    environment:string,
    author:string, 
    project:string
}