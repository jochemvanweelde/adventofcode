import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

type Rule = {
  threshold: number;
  operator: '>' | '<';
  next: string | 'R' | 'A';
};

type WorkFlow = {
  x?: Rule;
  m?: Rule;
  a?: Rule;
  s?: Rule;
  other: string;
};

type Product = {
  x: number;
  m: number;
  a: number;
  s: number;
};

function createWorkFlowMap(workflows: string) {
  const map = new Map<string, WorkFlow>();

  workflows.split('\n').forEach((workflow) => {
    const [key, conditions] = workflow.slice(0, workflow.length - 1).split('{');
    const conditionsArr = conditions.split(',');

    const workFlow: WorkFlow = {
      other: '',
    };

    conditionsArr.forEach((rule) => {
      if (!rule.includes(':')) {
        workFlow.other = rule;
        return;
      }

      const [condition, next] = rule.split(':');
      const [key, operator, threshold] = condition.split(/([><])/);

      workFlow[key as 'x' | 'm' | 'a' | 's'] = {
        threshold: Number(threshold),
        operator: operator as '>' | '<',
        next,
      };
    });

    map.set(key, workFlow);
  });

  return map;
}

function createProductList(products: string) {
  const list = new Array<Product>();

  products.split('\n').forEach((product) => {
    const [x, m, a, s] = product.slice(1, product.length - 1).split(',');

    list.push({
      x: Number(x.split('=')[1]),
      m: Number(m.split('=')[1]),
      a: Number(a.split('=')[1]),
      s: Number(s.split('=')[1]),
    });
  });

  return list;
}

function executeWorkFlow(workFlow: WorkFlow, product: Product) {
  const keys = ['x', 'm', 'a', 's'] as const;

  for (const key of keys) {
    const rule = workFlow[key];

    if (rule) {
      if (rule.operator === '>') {
        if (product[key] > rule.threshold) {
          return rule.next;
        }
      } else if (rule.operator === '<') {
        if (product[key] < rule.threshold) {
          return rule.next;
        }
      }
    }
  }

  return workFlow.other;
}

function executeWorkFlowsForProductMap(
  workFlowMap: Map<string, WorkFlow>,
  productList: Product[]
) {
  const productMap = new Map<string, Product[]>();
  const acceptedProducts = new Array<Product>();
  const rejectedProducts = new Array<Product>();

  productMap.set('in', productList);

  let hasChanged = true;

  while (hasChanged) {
    hasChanged = false;

    const keys = Array.from(productMap.keys());

    keys.forEach((key) => {
      const products = productMap.get(key);

      if (!products || products.length === 0) {
        return;
      }

      const workFlow = workFlowMap.get(key);

      if (!workFlow) {
        return;
      }

      const nextKey = executeWorkFlow(workFlow, products[0]);

      if (nextKey === 'A') {
        acceptedProducts.push(products[0]);
        hasChanged = true;
      } else if (nextKey === 'R') {
        rejectedProducts.push(products[0]);
        hasChanged = true;
      } else {
        const nextProducts = productMap.get(nextKey) || [];
        nextProducts.push(products[0]);
        productMap.set(nextKey, nextProducts);
        hasChanged = true;
      }

      products.shift();
    });
  }

  return acceptedProducts;
}

function calculateProductValue(product: Product) {
  return product.x + product.m + product.a + product.s;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [workflows, products] = input.split('\n\n');

  const workFlowMap = createWorkFlowMap(workflows);
  const productList = createProductList(products);

  const acceptedProducts = executeWorkFlowsForProductMap(
    workFlowMap,
    productList
  );

  return acceptedProducts.reduce(
    (acc, product) => acc + calculateProductValue(product),
    0
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
