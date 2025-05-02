/**
 * ZEKRO Token Contract Simulation (TypeScript)
 * --------------------------------------------
 * A simplified token class representing the ZEKRO utility and governance token.
 * 
 * Use cases:
 * - Tokenized payments for AI model access
 * - Smart contract licensing
 * - Community staking and governance
 * - Earning trustless royalties
 * 
 * Created for the decentralized AI marketplace: https://www.getzekro.com
 */

type UserAddress = string;

interface UsageRecord {
  modelId: string;
  user: UserAddress;
  amount: number;
  timestamp: Date;
}

export class ZekroToken {
  readonly name = "ZEKRO";
  readonly symbol = "ZEKRO";
  readonly description = "Utility + governance token powering a decentralized AI model marketplace.";
  readonly totalSupply: number;
  
  private balances: Map<UserAddress, number> = new Map();
  private usageHistory: UsageRecord[] = [];

  constructor(initialSupply: number, creator: UserAddress) {
    this.totalSupply = initialSupply;
    this.balances.set(creator, initialSupply);
  }

  /**
   * Transfer tokens between users
   */
  transfer(from: UserAddress, to: UserAddress, amount: number): boolean {
    const senderBalance = this.balances.get(from) || 0;
    if (senderBalance < amount) return false;

    this.balances.set(from, senderBalance - amount);
    this.balances.set(to, (this.balances.get(to) || 0) + amount);
    return true;
  }

  /**
   * Stake tokens for governance or model curation
   */
  stake(user: UserAddress, amount: number): boolean {
    const balance = this.balances.get(user) || 0;
    if (balance < amount) return false;

    // For simplicity, staking just reduces balance here
    this.balances.set(user, balance - amount);
    console.log(`${user} staked ${amount} ZEKRO tokens`);
    return true;
  }

  /**
   * Simulate licensing a model with token payment
   */
  licenseModel(user: UserAddress, modelId: string, cost: number): boolean {
    const balance = this.balances.get(user) || 0;
    if (balance < cost) return false;

    this.balances.set(user, balance - cost);
    this.usageHistory.push({
      modelId,
      user,
      amount: cost,
      timestamp: new Date()
    });
    return true;
  }

  /**
   * View current balance
   */
  getBalance(user: UserAddress): number {
    return this.balances.get(user) || 0;
  }

  /**
   * View all model license activity
   */
  getUsageHistory(): UsageRecord[] {
    return this.usageHistory;
  }
}
