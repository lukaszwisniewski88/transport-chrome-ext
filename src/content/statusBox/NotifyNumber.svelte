<script>
  export let count = 0;
</script>

<style>
  span {
    position: absolute;
    padding-top:1.2px;
    height: 16px;
    width: 16px;
    top: 42px;
    left: 46px;
    border: 2px solid #fa3e3e;
    border-radius: 10px;
    font: 12px Arial;
    font-weight: 600;
    color:#fffa;
    text-align: center;
    background-color: #fa3e3e;
    box-shadow: .5px .5px 8px .3px rgba(128,128,128,1);
    user-select: none;
  }
</style>
{#if count>0}
<span>{count}</span>
{/if}