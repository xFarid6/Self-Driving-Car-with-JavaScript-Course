class NeuralNetwork {
    constructor(neuronCounts){
        this.levels = [];
        for (let i = 0; i < neuronCounts.length-1; i++) { 
            this.levels.push(new Level(
                neuronCounts[i], 
                neuronCounts[i+1],
            ));
        }
    }

    static feedForward(givenInputs, network){
        let outputs = Level.feedForward(
            givenInputs,
            network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                outputs,
                network.levels[i]);
        }

        return outputs;
    }

    static mutate(network, amount=1){
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
    }
}

class Level{
    constructor(inCount, outCount){
        this.inputs = new Array(inCount);
        this.outputs = new Array(outCount);
        this.biasess = new Array(outCount);

        this.weights = [];
        for (let i = 0; i < inCount; i++) {
            this.weights[i] = new Array(outCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level){
        for (let i = 0; i < level.inputs.lenght; i++) {
            for (let j = 0; j < level.outputs.lenght; j++) {
                level.weights[i][j] = Math.random()*2-1;
            }
        }

        for (let i = 0; i < level.biases.lenght; i++) {
            level.biasess[i] = Math.random()*2-1;
        }
    }

    static feedForward(givenInputs, level){
       for (let i = 0; i < level.inputs.length; i++) {
           level.inputs[i] = givenInputs[i];
        }
       
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j]*level.weights[j][i];
            }

            if(sum>level.biases[i]){
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }

            // level.outputs[i] = sigmoid(sum+level.biasess[i]);
        }

        return level.outputs;
    }

    static #sigmoid(x){
        return 1/(1+Math.exp(-x));
    }
}

// line equation: y = ws + b where y = 0, w is the weight, s is the sensor and b is the bias
// plane equation: w0+s0 + w1+s1 + w2+s2 = 0 for each output