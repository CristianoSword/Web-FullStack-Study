//gcc 7.4.0

#include  <stdio.h>

int main(void)
    
{
    int valor = 400;
    printf("o valor 300usd x12 iteracoes de 27%% \n");
    
    for(int i=0; i<=12; i++)
    {
        valor = valor + (valor*0.27);
        printf("%dx iteracao %i usd = valor acrescido \n", i, valor);
    }
            
    return 0;
}
