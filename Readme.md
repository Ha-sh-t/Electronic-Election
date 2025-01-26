Frontend:

1).Login : POST/api/auth/login 
            >req body : {username , password}
            >response : {jwt-token , message}
2).Vote: Get/api/votes/options 
        >response :{options , voting-window(start and timing)}

3).Cast Vote: POST/api/votes/cast
        >req body :{encryptedVote , proof_of_validity , voterId}
        >response :{status(success , failure) , message , receipt}
4).Retrieve Vote Receipt
        >req : Get/api/votes/receipt/{receiptId}

5).fetch bullatin 
        >req : Get/api/bullatin

6).